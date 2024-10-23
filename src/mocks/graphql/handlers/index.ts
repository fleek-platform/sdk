import { graphql } from 'msw';
import { handlers as FleekSdkHandlers } from './FleekSdk';
import { handlers as ApplicationHandlers } from './Applications';
import { handlers as DomainsHandlers } from './Domains';

export const mockGraphqlServiceApiUrl = 'https://fleek.mock.server/graphql';
export const localhost = graphql.link(mockGraphqlServiceApiUrl);

export const handlers = [
  ...FleekSdkHandlers,
  ...ApplicationHandlers,
  ...DomainsHandlers,
];
