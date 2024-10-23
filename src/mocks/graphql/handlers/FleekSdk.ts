import { graphql, HttpResponse } from 'msw';

export const mockGraphqlServiceApiUrl = 'https://fleek.mock.server/graphql';
const localhost = graphql.link(mockGraphqlServiceApiUrl);

const queries = [
  localhost.query('GetVersion', () => 
    HttpResponse.json({
      data: {
        "version": {
          "__typename": "Version",
          "commitHash": "0fabad88415cedb2c3c21548afa14a949a088954"
        },
      }
    }),
  ),  
]

export const handlers = [
  ...queries,
];

