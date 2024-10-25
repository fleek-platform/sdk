import { graphql as executeGraphql, buildSchema } from 'graphql';
import { HttpResponse } from 'msw';

import { localhost } from '@mocks/graphql/config';
import { schemaStr } from '@mocks/graphql/schema';

const schema = buildSchema(schemaStr);

const queries = [
  localhost.query('GetPrivateGateway', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        privateGateway: {
          __typename: 'PrivateGateway',
          createdAt: '2023-03-24T09:05:13.641Z',
          id: 'clhruz26u000108mbdb2zaft0',
          name: 'electronic.co eshop',
          primaryDomain: {
            __typename: 'Domain',
            id: 'clmhwwted000108mnajduel68',
          },
          project: {
            __typename: 'Project',
            id: 'clgkiwjd8000c08mefyco2eoo',
          },
          slug: 'blue-fox-two',
          updatedAt: '2023-04-24T09:05:13.641Z',
          zone: {
            __typename: 'Zone',
            id: 'cljfq6n2y000008lb4oy403bc',
          },
        },
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
];

export const handlers = [...queries];
