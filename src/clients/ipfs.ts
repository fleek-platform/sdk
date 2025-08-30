import { SdkRequiredNodeRuntimeError } from '@fleek-platform/errors';
import { filesFromPaths } from 'files-from-path';

import { requireNodeEnv } from '../libs/requireNodeEnv';
import { isNode } from '../utils/node';
import { UploadPinResponse, UploadProxyClient } from './uploadProxy';

export type IpfsFile = {
  path?: string;
  content: ArrayBuffer | string;
};

export type IpfsClientOptions = {
  uploadProxyClient: UploadProxyClient;
};

export type AddFromPathOptions = {
  wrapWithDirectory?: boolean;
  searchParams?: URLSearchParams;
  siteId?: string;
};

export class IpfsClient {
  private uploadProxyClient: UploadProxyClient;

  constructor(options: IpfsClientOptions) {
    if (!isNode) {
      throw new SdkRequiredNodeRuntimeError();
    }

    this.uploadProxyClient = options.uploadProxyClient;
  }

  private pinToUploadResult = async (
    pin: UploadPinResponse['pin'],
    path: string,
  ) => {
    const { CID } = await import('ipfs-http-client');

    return {
      cid: CID.parse(pin.cid),
      size: pin.size,
      path,
    };
  };

  private addFromPath = async (
    path: string,
    options: AddFromPathOptions = {},
  ) => {
    requireNodeEnv();

    const nodePath = await import('path');
    const basename = nodePath.basename(path);

    const { promises: fs } = await import('fs');
    const stat = await fs.stat(path);
    const { UnixFS } = await import('@web3-storage/upload-client');

    if (!stat.isDirectory()) {
      const fileFromPath = await filesFromPaths([path]);
      const getStream = () => UnixFS.createFileEncoderStream(fileFromPath[0]);

      const { pin } = await this.uploadProxyClient.uploadContent({
        getStream,
        basename,
        options: { siteId: options.siteId },
      });

      return [await this.pinToUploadResult(pin, basename)];
    }

    const filesfromPath = await filesFromPaths([path]);
    const getStream = () => UnixFS.createDirectoryEncoderStream(filesfromPath);
    const { pin } = await this.uploadProxyClient.uploadContent({
      getStream,
      basename,
    });

    return [await this.pinToUploadResult(pin, basename)];
  };

  public addSitesToIpfs = async (
    path: string,
    options: AddFromPathOptions = {},
  ) => {
    return this.addFromPath(path, options);
  };
}
