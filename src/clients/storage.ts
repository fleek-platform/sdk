import {
  FleekFunctionNotFoundError,
  PathIsNotADirectoryError,
  PathIsNotAFileError,
  PinNotFoundError,
  PinsNotFoundError,
  SiteNotFoundError,
} from '@fleek-platform/errors';
import {
  Client,
  FleekFunctionGenqlSelection,
  Pin,
  PinGenqlSelection,
  PinsWithAggregationGenqlSelection,
  SiteGenqlSelection,
} from '@fleek-platform/utils-genql-client';
import { File } from '@web-std/file';
import { UnixFS } from '@web3-storage/upload-client';
import { FileLike } from '@web3-storage/upload-client/types';
import { filesFromPaths } from 'files-from-path';

import { requireNodeEnv } from '../libs/requireNodeEnv';
import {
  isFilecoinDealsResponseQuery,
  isPinResponseQuery,
  isPinsResponseQuery,
} from '../utils/graphql';
import { createFileHash } from '../utils/hash';
import {
  UploadContentOptions,
  UploadPinResponse,
  UploadProgress,
  UploadProxyClient,
} from './uploadProxy';

export type StoragePin = Pick<
  Pin,
  'cid' | 'filename' | 'extension' | 'arweavePin'
> & {
  filecoinDealIds?: string;
  arweaveId?: string | undefined;
};
export type PinByCidArgs = Pick<Pin, 'cid'>;
export type PinByFilenameArgs = Pick<Pin, 'filename' | 'extension'>;

export type GetPinArgs = PinByCidArgs;
export type GetPinByFilenameArgs = PinByFilenameArgs;

export type DeletePinArgs = PinByCidArgs;

type StorageClientOptions = {
  graphqlClient: Client;
  uploadProxyClient: UploadProxyClient;
};

type UploadDirectoryArgs = {
  path: string;
  parentFolderId?: string;
  options?: UploadContentOptions;
  onUploadProgress?: (uploadProgress: UploadProgress) => void;
};

type UploadPrivateFileArgs = {
  filePath: string;
  hashingAlhorithm?: 'sha256' | 'sha512' | 'blake3';
  onUploadProgress?: (uploadProgress: UploadProgress) => void;
};
type UploadFileArgs = {
  file: FileLike;
  parentFolderId?: string;
  options?: UploadContentOptions;
  onUploadProgress?: (uploadProgress: UploadProgress) => void;
};

type UploadVirtualDirectoryArgs = {
  files: FileLike[];
  directoryName: string;
  parentFolderId?: string;
  onUploadProgress?: (uploadProgress: UploadProgress) => void;
};

export class StorageClient {
  private graphqlClient: Client;
  private uploadProxyClient: UploadProxyClient;

  private static SITE_MAPPED_PROPERTIES: SiteGenqlSelection = { id: true };

  private static FUNCTION_MAPPED_PROPERTIES: FleekFunctionGenqlSelection = {
    id: true,
  };

  private static STORAGE_MAPPED_PROPERTIES: PinGenqlSelection = {
    cid: true,
    filename: true,
    extension: true,
    arweavePin: {
      bundlrId: true,
      __typename: true,
    },
    __typename: true,
  };

  private static STORAGE_WITH_AGGREGATION_MAPPED_PROPERTIES: PinsWithAggregationGenqlSelection =
    {
      data: StorageClient.STORAGE_MAPPED_PROPERTIES,
      __typename: true,
    };

  constructor(options: StorageClientOptions) {
    this.graphqlClient = options.graphqlClient;
    this.uploadProxyClient = options.uploadProxyClient;
  }

  public uploadDirectory = async ({
    path,
    parentFolderId,
    options,
    onUploadProgress,
  }: UploadDirectoryArgs): Promise<UploadPinResponse> => {
    requireNodeEnv();

    const { promises } = await import('fs');
    const stat = await promises.stat(path);

    if (!stat.isDirectory()) {
      throw new PathIsNotADirectoryError({ path });
    }

    if (options?.siteId) {
      this.checkSiteInDb(options?.siteId);
    }

    if (options?.functionName) {
      // TODO: figure out why this async call wasn't
      // being awaited?
      await this.checkFunctionInDb(options?.functionName);
    }

    const { basename: getBasename } = await import('path');
    const basename = getBasename(path);

    const files = await filesFromPaths([path]);

    const getStream = () => UnixFS.createDirectoryEncoderStream(files);

    return this.uploadProxyClient.uploadContent({
      getStream,
      basename,
      parentFolderId,
      options,
      onUploadProgress,
    });
  };

  public uploadVirtualDirectory = async ({
    files,
    directoryName,
    parentFolderId,
    onUploadProgress,
  }: UploadVirtualDirectoryArgs): Promise<UploadPinResponse> => {
    const getStream = () => UnixFS.createDirectoryEncoderStream(files, {});

    return this.uploadProxyClient.uploadContent({
      getStream,
      basename: directoryName,
      parentFolderId,
      onUploadProgress,
    });
  };

  public uploadPrivateFile = async ({
    filePath,
    hashingAlhorithm,
    onUploadProgress,
  }: UploadPrivateFileArgs): Promise<UploadPinResponse> => {
    const { promises } = await import('fs');
    const stat = await promises.stat(filePath);

    if (!stat.isFile()) {
      throw new PathIsNotAFileError({ path: filePath });
    }

    const buffer = await promises.readFile(filePath, 'binary');
    const fileHash = await createFileHash({
      file: buffer,
      algorithm: hashingAlhorithm ?? 'sha256',
    });
    const path = await import('path');
    const file = new File([buffer], path.basename(filePath));

    return this.uploadProxyClient.uploadPrivateContent({
      file,
      fileHash,
      onUploadProgress,
    });
  };

  public uploadFile = async ({
    file,
    parentFolderId,
    options,
    onUploadProgress,
  }: UploadFileArgs): Promise<UploadPinResponse> => {
    if (options?.siteId) {
      this.checkSiteInDb(options?.siteId);
    }

    if (options?.functionName) {
      // TODO: Investigate why this async call wasn't
      // being awaited?
      await this.checkFunctionInDb(options?.functionName);
    }

    const getStream = () => UnixFS.createFileEncoderStream(file);

    return this.uploadProxyClient.uploadContent({
      getStream,
      basename: file.name,
      parentFolderId,
      options,
      onUploadProgress,
    });
  };

  public get = async ({ cid }: GetPinArgs): Promise<StoragePin> => {
    const response = await this.graphqlClient.query({
      pin: {
        __args: {
          where: { cid },
        },
        ...StorageClient.STORAGE_MAPPED_PROPERTIES,
      },
    });

    if (!isPinResponseQuery(response.pin)) {
      throw new PinNotFoundError({ pin: { cid } });
    }

    const { filecoinDeals } = await this.graphqlClient.query({
      filecoinDeals: {
        __args: {
          where: { cid },
        },
        data: {
          dealId: true,
          __typename: true,
        },
        __typename: true,
      },
    });

    if (!isFilecoinDealsResponseQuery(filecoinDeals.data)) {
      throw new PinNotFoundError({ pin: { cid } });
    }

    return {
      ...response.pin,
      arweaveId: response.pin.arweavePin?.bundlrId,
      filecoinDealIds: filecoinDeals.data.map((deal) => deal.dealId).join(','),
    };
  };

  public getByFilename = async ({
    filename,
    extension,
  }: GetPinByFilenameArgs): Promise<StoragePin[]> => {
    const response = await this.graphqlClient.query({
      pinsByFilename: {
        __args: {
          where: { filename, extension },
        },
        ...StorageClient.STORAGE_WITH_AGGREGATION_MAPPED_PROPERTIES,
      },
    });

    if (!isPinsResponseQuery(response.pinsByFilename?.data)) {
      throw new PinsNotFoundError({ filename });
    }

    return await Promise.all(
      response.pinsByFilename.data.map(async (pin) => {
        const res = await this.graphqlClient.query({
          filecoinDeals: {
            __args: {
              where: { cid: pin.cid },
            },
            data: {
              dealId: true,
            },
          },
        });

        return {
          ...pin,
          arweaveId: pin.arweavePin?.bundlrId,
          filecoinDealIds: res.filecoinDeals.data
            .map((deal) => deal.dealId)
            .join(','),
        };
      }),
    );
  };

  public list = async (): Promise<StoragePin[]> => {
    const response = await this.graphqlClient.query({
      pins: {
        __args: {},
        data: {
          ...StorageClient.STORAGE_MAPPED_PROPERTIES,
        },
        __typename: true,
      },
    });

    const pin: StoragePin = response.pins.data[0];

    if (!isPinsResponseQuery(response.pins?.data)) {
      throw new PinNotFoundError({ pin: { cid: pin.cid } });
    }

    return await Promise.all(
      response.pins.data.map(async (pin) => {
        const res = await this.graphqlClient.query({
          filecoinDeals: {
            __args: {
              where: { cid: pin.cid },
            },
            data: {
              dealId: true,
              __typename: true,
            },
            __typename: true,
          },
        });

        return {
          ...pin,
          arweaveId: pin.arweavePin?.bundlrId,
          filecoinDealIds: res.filecoinDeals.data
            .map((deal) => deal.dealId)
            .join(','),
        };
      }),
    );
  };

  public delete = async ({ cid }: DeletePinArgs) => {
    const response = await this.uploadProxyClient.delete(cid);

    return {
      status: response.status,
      body: await response.json(),
    };
  };

  private checkFunctionInDb = async (name: string) => {
    try {
      await this.graphqlClient.query({
        fleekFunctionByName: {
          __args: {
            where: { name },
          },
          id: true,
        },
      });
    } catch (_err) {
      throw new FleekFunctionNotFoundError({ function: { name } });
    }
  };

  private checkSiteInDb = async (id: string) => {
    try {
      await this.graphqlClient.query({
        site: {
          __args: {
            where: { id },
          },
          data: {
            cid: true,
            filename: true,
            extension: true,
            arweavePin: {
              bundlrId: true,
            },
          },
        },
      });
    } catch {
      throw new SiteNotFoundError({ site: { id } });
    }
  };
}
