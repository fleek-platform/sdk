import {
  AuthorizationError,
  SdkRequiredNodeRuntimeError,
} from '@fleek-platform/errors';
import { Client, createClient } from '@fleek-platform/utils-genql-client';
import { EnvNotSetError } from '@fleek-platform/errors';

import { ApplicationsClient } from './clients/applications';
import { DomainsClient } from './clients/domains';
import { EnsClient } from './clients/ens';
import { FunctionsClient } from './clients/functions';
import { IpfsClient } from './clients/ipfs';
import { IpnsClient } from './clients/ipns';
import { PrivateGatewayClient } from './clients/privateGateway';
import { ProjectsClient } from './clients/projects';
import { SitesClient } from './clients/sites';
import { StorageClient } from './clients/storage';
import { UploadProxyClient } from './clients/uploadProxy';
import { UserClient } from './clients/user';
import { getDefined } from './defined';
import { AccessTokenService } from './libs/AccessTokenService/AccessTokenService';
import { graphqlFetcher } from './libs/graphqlFetcher';
import { isNode } from './utils/node';

type Headers = Record<string, string>;

type FleekSdkOptions = {
  graphqlServiceApiUrl?: string;
  ipfsStorageApiUrl?: string;
  uploadProxyApiUrl?: string;
  accessTokenService: AccessTokenService;
};

export class FleekSdk {
  private accessTokenService: AccessTokenService;
  private graphqlClient: Client;
  private uploadProxyClient: UploadProxyClient;

  private userClient?: UserClient;
  private projectsClient?: ProjectsClient;
  private ipnsClient?: IpnsClient;
  private sitesClient?: SitesClient;
  private domainsClient?: DomainsClient;
  private applicationsClient?: ApplicationsClient;
  private privateGatewayClient?: PrivateGatewayClient;
  private ensClient?: EnsClient;

  private storageClient?: StorageClient;
  private uploadProxyApiUrl: string;

  private graphqlServiceApiUrl: string;

  private ipfsClient?: IpfsClient;
  private ipfsStorageApiUrl: string;
  private functionsClient?: FunctionsClient;

  constructor({
    graphqlServiceApiUrl = getDefined('SDK__GRAPHQL_API_URL'),
    ipfsStorageApiUrl = getDefined('SDK__IPFS__STORAGE_API_URL'),
    uploadProxyApiUrl = getDefined('SDK__UPLOAD_PROXY_API_URL'),
    accessTokenService,
  }: FleekSdkOptions) {
    if (!ipfsStorageApiUrl) {
      throw new EnvNotSetError('SDK__IPFS__STORAGE_API_URL');
    }

    if (!uploadProxyApiUrl) {
      throw new EnvNotSetError('SDK__UPLOAD_PROXY_API_URL');
    }

    if (!accessTokenService) {
      throw new AuthorizationError();
    }

    this.accessTokenService = accessTokenService;

    this.graphqlClient = createClient({
      fetcher: async (operation) =>
        graphqlFetcher({
          operation,
          headers: {
            ...(await this.getAuthenticationHeaders()),
            ...this.getCustomHeaders(),
          },
          endpoint: this.graphqlServiceApiUrl,
        }),
    });

    this.graphqlServiceApiUrl = graphqlServiceApiUrl;
    this.ipfsStorageApiUrl = ipfsStorageApiUrl;
    this.uploadProxyApiUrl = uploadProxyApiUrl;

    this.uploadProxyClient = new UploadProxyClient({
      uploadProxyApiUrl: this.uploadProxyApiUrl,
      accessTokenService: this.accessTokenService,
    });
  }

  public getVersion = async () => {
    const response = await this.graphqlClient.query({
      __name: 'GetVersion',
      version: { __scalar: true },
    });

    return response;
  };

  public user = (): UserClient => {
    if (!this.userClient) {
      this.userClient = new UserClient({ graphqlClient: this.graphqlClient });
    }

    return this.userClient;
  };

  public ipns = (): IpnsClient => {
    if (!this.ipnsClient) {
      this.ipnsClient = new IpnsClient({ graphqlClient: this.graphqlClient });
    }

    return this.ipnsClient;
  };

  public ipfs = (): IpfsClient => {
    if (!isNode) {
      throw new SdkRequiredNodeRuntimeError();
    }

    if (!this.ipfsClient) {
      this.ipfsClient = new IpfsClient({
        uploadProxyClient: this.uploadProxyClient,
        accessTokenService: this.accessTokenService,
        ipfsStorageApiUrl: this.ipfsStorageApiUrl,
      });
    }

    console.warn(
      'Warning: The `ipfs` service in Fleek SDK will be deprecated. Please use `storage` service instead',
    );

    return this.ipfsClient;
  };

  public sites = (): SitesClient => {
    if (!this.sitesClient) {
      this.sitesClient = new SitesClient({ graphqlClient: this.graphqlClient });
    }

    return this.sitesClient;
  };

  public projects = (): ProjectsClient => {
    if (!this.projectsClient) {
      this.projectsClient = new ProjectsClient({
        graphqlClient: this.graphqlClient,
      });
    }

    return this.projectsClient;
  };

  public domains = (): DomainsClient => {
    if (!this.domainsClient) {
      this.domainsClient = new DomainsClient({
        graphqlClient: this.graphqlClient,
      });
    }

    return this.domainsClient;
  };

  public applications = (): ApplicationsClient => {
    if (!this.applicationsClient) {
      this.applicationsClient = new ApplicationsClient({
        graphqlClient: this.graphqlClient,
      });
    }

    return this.applicationsClient;
  };

  public ens = (): EnsClient => {
    if (!this.ensClient) {
      this.ensClient = new EnsClient({ graphqlClient: this.graphqlClient });
    }

    return this.ensClient;
  };

  public privateGateways = (): PrivateGatewayClient => {
    if (!this.privateGatewayClient) {
      this.privateGatewayClient = new PrivateGatewayClient({
        graphqlClient: this.graphqlClient,
      });
    }

    return this.privateGatewayClient;
  };

  public storage = (): StorageClient => {
    if (!this.storageClient) {
      this.storageClient = new StorageClient({
        graphqlClient: this.graphqlClient,
        uploadProxyClient: this.uploadProxyClient,
      });
    }

    return this.storageClient;
  };

  public functions = (): FunctionsClient => {
    if (!this.functionsClient) {
      this.functionsClient = new FunctionsClient({
        graphqlClient: this.graphqlClient,
      });
    }

    return this.functionsClient;
  };

  private getAuthenticationHeaders = async () => {
    try {
      const accessToken = await this.accessTokenService.getAccessToken();

      if (!accessToken) {
        return {};
      }

      const headers: Headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      return headers;
    } catch {
      return {};
    }
  };

  private getCustomHeaders = () => {
    const headers: Headers = {
      'X-Client-Type': 'sdk',
    };

    return headers;
  };
}
