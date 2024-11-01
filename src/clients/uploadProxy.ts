import {
  FolderNotFoundError,
  StorageIpfsUploadFailedError,
  StorageUploadFileCountQuotaExceededError,
  StorageUploadTotalSizeQuotaExceededError,
  UnknownError,
  UploadProxyStoreAsCarError,
  UploadProxyUploadFileError,
} from '@fleek-platform/errors';
import { Pin } from '@fleek-platform/utils-genql-client';
import { FormData } from '@web-std/form-data';
import type { Block } from '@web3-storage/upload-client/car';
// TODO: The project has `axios`, thus the `isomorphic-fetch`
// or anything related to `fetch` should be replaced by `axios`
// Try to understand what the original author was trying to do
import axios from 'axios';
import { base32 } from 'multiformats/bases/base32';
import { StoragePin } from '../clients/storage';
import { AccessTokenService } from '../libs/AccessTokenService/AccessTokenService';
import { retry } from '../libs/retry';

type GetStreamCidAndTotalSizeArgs = { getStream: () => ReadableStream<Block> };

type CheckPinDuplicityByCidArgs = { cid: string };

type CheckPinDuplicityByParentFolderAndBasenameArgs = {
  parentFolderId: string;
  basename: string;
};

type CheckPinDuplicityArgs = { url: URL };

const shardSize = 10_485_760;
const uploadConcurrency = 3;

export type UploadProgress = {
  loadedSize: number;
  totalSize?: number;
};

type UploadProxyClientOptions = {
  accessTokenService: AccessTokenService;
  uploadProxyApiUrl: string;
};

type UploadContentArgs = {
  getStream: () => ReadableStream<Block>;
  basename: string;
  parentFolderId?: string;
  options?: UploadContentOptions;
  onUploadProgress?: (uploadProgress: UploadProgress) => void;
};

type UploadPrivateContentArgs = {
  file: File;
  fileHash: string;
  onUploadProgress?: (uploadProgress: UploadProgress) => void;
};

export type UploadContentOptions = {
  siteId?: string;
  functionName?: string;
};

export type UploadPinResponse = {
  pin: Pick<Pin, 'cid' | 'size'>;
  duplicate: boolean;
};

const fetchWithValidStatus = async ({
  request,
  parentFolderId,
  validStatuses = [200],
}: {
  request: Request;
  parentFolderId?: string;
  validStatuses?: number[];
}) => {
  const response = await fetch(request);

  if (!validStatuses.includes(response.status)) {
    if (response.status === 429) {
      const error = await response
        .json()
        ?.then((res) => res.errors[0])
        .catch((err) => {
          console.warn('Unexpected response with 429 status', err);
          throw new UnknownError();
        });

      if (error.code === 'DailyUploadedTotalSizeQuotaExceeded') {
        throw new StorageUploadTotalSizeQuotaExceededError(error.data);
      } else if (error.code === 'DailyUploadedFilesQuotaExceeded') {
        throw new StorageUploadFileCountQuotaExceededError(error.data);
      } else if (error.code === 'FolderNotFoundError' && parentFolderId) {
        throw new FolderNotFoundError({ folder: { id: parentFolderId } });
      } else {
        throw new UnknownError();
      }
    } else {
      throw new StorageIpfsUploadFailedError();
    }
  }

  return response;
};

export class UploadProxyClient {
  private uploadProxyApiUrl: string;
  private accessTokenService: AccessTokenService;

  constructor(options: UploadProxyClientOptions) {
    this.accessTokenService = options.accessTokenService;
    this.uploadProxyApiUrl = options.uploadProxyApiUrl;
  }

  public uploadPrivateContent = async ({
    file,
    fileHash,
    onUploadProgress,
  }: UploadPrivateContentArgs) => {
    const formData = new FormData();
    formData.append('hash', fileHash);
    formData.append('file', file);

    const accessToken = await this.accessTokenService.getAccessToken();

    try {
      const response = await axios.post<StoragePin>(
        `${this.uploadProxyApiUrl}/upload/private`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.lengthComputable && onUploadProgress) {
              onUploadProgress({
                loadedSize: progressEvent.loaded,
                totalSize: progressEvent.total,
              });
            }
          },
        },
      );

      if (response.status !== 201 || !response.data?.cid) {
        throw new StorageIpfsUploadFailedError();
      }

      return {
        pin: { cid: response.data.cid, size: file.size },
        duplicate: false,
      };
    } catch (error) {
      throw new StorageIpfsUploadFailedError();
    }
  };

  public uploadContent = async ({
    getStream,
    basename,
    parentFolderId,
    options,
    onUploadProgress,
  }: UploadContentArgs): Promise<UploadPinResponse> => {
    const { cid, totalSize } = await this.getStreamCidAndTotalSize({
      getStream,
    });
    const isDuplicity = parentFolderId
      ? await this.checkPinDuplicityByParentFolderAndBasename({
          parentFolderId,
          basename,
        })
      : await this.checkPinDuplicityByCid({ cid });

    if (isDuplicity) {
      return { pin: { cid, size: totalSize }, duplicate: true };
    }

    if (onUploadProgress) {
      onUploadProgress({ totalSize, loadedSize: 0 });
    }

    let loadedSize = 0;
    const shardCids: string[] = [];

    const { ShardingStream } = await import('@web3-storage/upload-client');
    const { Parallel } = await import('parallel-transform-web');

    await getStream()
      .pipeThrough(new ShardingStream({ shardSize }))
      .pipeThrough(
        new Parallel(uploadConcurrency, async (car) => {
          const url = new URL(this.uploadProxyApiUrl);
          url.pathname = 'store';

          const accessToken = await this.accessTokenService.getAccessToken();
          const body = new Uint8Array(await car.arrayBuffer());

          try {
            const response = await retry({
              fn: async () =>
                fetchWithValidStatus({
                  request: new Request(url, {
                    method: 'POST',
                    body,
                    headers: {
                      'Content-Type': 'application/vnd.ipld.car',
                      Authorization: `Bearer ${accessToken}`,
                    },
                  }),
                  parentFolderId,
                }),
              tries: 3,
              intervalMs: 3_000,
            });

            return { cid: await response.text(), size: body.byteLength };
          } catch {
            throw new UploadProxyStoreAsCarError();
          }
        }),
      )
      .pipeTo(
        new WritableStream({
          write: async ({ cid, size }: { cid: string; size: number }) => {
            shardCids.push(cid);

            if (onUploadProgress) {
              loadedSize += size;
              onUploadProgress({ totalSize, loadedSize });
            }
          },
        }),
      );

    const url = new URL(this.uploadProxyApiUrl);
    url.pathname = 'upload';

    if (options?.siteId) {
      url.searchParams.append('sites', 'true');
    }

    if (options?.functionName) {
      url.searchParams.append('function', 'true');
    }

    const accessToken = await this.accessTokenService.getAccessToken();

    const body = JSON.stringify({
      basename,
      parentFolderId,
      totalSize,
      rootCid: cid,
      shardCids,
    });

    try {
      await retry({
        fn: async () =>
          fetchWithValidStatus({
            request: new Request(url, {
              method: 'POST',
              body,
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
              },
            }),
            parentFolderId,
          }),
        tries: 3,
        intervalMs: 3_000,
      });
    } catch {
      throw new UploadProxyUploadFileError();
    }

    return { pin: { cid, size: totalSize }, duplicate: false };
  };

  public delete = async (cid: string) => {
    const accessToken = await this.accessTokenService.getAccessToken();

    const url = new URL(this.uploadProxyApiUrl);
    url.pathname = `delete/${cid}`;

    return fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: ` ${accessToken}`,
      },
    });
  };

  private getStreamCidAndTotalSize = async ({
    getStream,
  }: GetStreamCidAndTotalSizeArgs) => {
    let totalSize = 0;
    let cid: string | undefined;
    const { ShardingStream } = await import('@web3-storage/upload-client');

    await getStream()
      .pipeThrough(new ShardingStream({ shardSize }))
      .pipeTo(
        new WritableStream({
          write: (car) => {
            if (car.roots[0]) {
              cid = car.roots[0].toV1().toString(base32);
            }

            totalSize += car.size;
          },
        }),
      );

    if (!cid) {
      throw new StorageIpfsUploadFailedError();
    }

    return { cid, totalSize };
  };

  private checkPinDuplicityByCid = async ({
    cid,
  }: CheckPinDuplicityByCidArgs) => {
    const url = new URL(this.uploadProxyApiUrl);
    url.pathname = `duplicity/${cid}`;

    return this.checkPinDuplicty({ url });
  };

  private checkPinDuplicityByParentFolderAndBasename = async ({
    parentFolderId,
    basename,
  }: CheckPinDuplicityByParentFolderAndBasenameArgs) => {
    const url = new URL(this.uploadProxyApiUrl);
    url.pathname = `/folder/${parentFolderId}/duplicity/${basename}`;

    return this.checkPinDuplicty({ url });
  };

  private checkPinDuplicty = async ({ url }: CheckPinDuplicityArgs) => {
    const accessToken = await this.accessTokenService.getAccessToken();

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.status === 409;
  };
}
