import { graphql as executeGraphql, buildSchema } from 'graphql';
import { HttpResponse } from 'msw';

import { localhost } from '@mocks/graphql/config';
import { schemaStr } from '@mocks/graphql/schema';

const schema = buildSchema(schemaStr);

const mutations = [
  localhost.mutation('CreateProject', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        createProject: {
          avatar: null,
          backupStorageOnArweave: false,
          backupStorageOnFilecoin: true,
          createdAt: '2023-03-24T09:05:13.641Z',
          id: 'clje357cc000108jse08c2t6m',
          name: 'new-project',
        },
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
];

export const handlers = [...mutations];
