import { graphql } from 'msw';
import { handlers as FleekSdkHandlers } from './FleekSdk';

export const mockGraphqlServiceApiUrl = 'https://fleek.mock.server/graphql';
export const localhost = graphql.link(mockGraphqlServiceApiUrl);


export const handlers = [
  ...FleekSdkHandlers,
];
