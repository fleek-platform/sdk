import { graphql } from 'msw';
import { handlers as FleekSdkHandlers } from './FleekSdk';
import { handlers as ApplicationHandlers } from './Applications';

export const mockGraphqlServiceApiUrl = 'https://fleek.mock.server/graphql';
export const localhost = graphql.link(mockGraphqlServiceApiUrl);

export const handlers = [
  ...FleekSdkHandlers,
  ...ApplicationHandlers,
];
