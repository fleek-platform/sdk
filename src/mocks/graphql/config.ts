import { graphql } from 'msw';

export const mockGraphqlServiceApiUrl = 'https://fleek.mock.server/graphql';
export const localhost = graphql.link(mockGraphqlServiceApiUrl);
