import { graphql } from 'msw';
import { handlers as FleekSdkHandlers } from './FleekSdk';
import { handlers as ApplicationHandlers } from './Applications';
import { handlers as DomainsHandlers } from './Domains';
import { handlers as EnsHandlers } from './ENS';
import { handlers as FunctionsHandlers } from './Functions';
import { handlers as IpnsHandlers } from './IPNS';
import { handlers as PrivateGatewayHandlers } from './PrivateGateway';

export const mockGraphqlServiceApiUrl = 'https://fleek.mock.server/graphql';
export const localhost = graphql.link(mockGraphqlServiceApiUrl);

export const handlers = [
  ...FleekSdkHandlers,
  ...ApplicationHandlers,
  ...DomainsHandlers,
  ...EnsHandlers,
  ...FunctionsHandlers,
  ...IpnsHandlers,
  ...PrivateGatewayHandlers,
];
