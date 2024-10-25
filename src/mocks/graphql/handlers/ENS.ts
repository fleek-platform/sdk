import { graphql as executeGraphql, buildSchema } from 'graphql';
import { HttpResponse } from 'msw';

import { localhost } from '@mocks/graphql/config';
import { schemaStr } from '@mocks/graphql/schema';

const schema = buildSchema(schemaStr);

const mutations = [
  localhost.mutation('CreateEnsRecord', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        createEnsRecord: {
          createdAt: '2023-03-24T09:05:13.641Z',
          id: 'clgmg76ch000208mid5o30du0',
          ipnsRecord: {
            hash: 'QmcvfRw5WDutRzvRNq2matcJWW2nKWFGDbqxaaTxnWksME',
            id: 'clgkj995t000108med7gb2w4v',
            name: 'k51qzi5uqu5dhrupvn0ru1c6el43rhimh95cuiwqy0ofo8bgomvq296b49v9r7',
          },
          name: 'test.eth',
          site: {
            id: 'clgma7ilu000008jzdlwhb76a',
          },
          status: 'CREATED',
          updatedAt: '2023-03-24T09:05:13.641Z',
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
