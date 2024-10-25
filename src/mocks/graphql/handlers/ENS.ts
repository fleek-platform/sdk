import { graphql as executeGraphql, buildSchema } from 'graphql';
import { HttpResponse } from 'msw';

import { localhost } from '@mocks/graphql/config';
import { schemaStr } from '@mocks/graphql/schema';

const schema = buildSchema(schemaStr);

const queries = [
  localhost.query('GetEnsRecord', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        ensRecord: {
          createdAt: '2023-03-24T08:05:13.641Z',
          id: 'af470cc1-08d8-4d39-be6f-b0eebc0a6480',
          ipnsRecord: {
            hash: 'QmW73w6jvat7zDpFkYHft8eB88LiU6fPyV9LUX9et7XRUy',
            id: 'clgkj9pfa000308meh73d8nff',
            name: 'k51qzi5uqu5dipwqop5kj5na30qlwqbyyn54g8y3jcm3sdc02t9tjlec2a46ci',
          },
          name: 'ens.eth',
          site: {
            id: 'clgove94b000208mlhq685zgh',
          },
          status: 'ACTIVE',
          updatedAt: '2023-03-24T08:05:13.641Z',
        },
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
  localhost.query('GetEnsRecordByName', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        ensRecordByName: {
          createdAt: '2023-03-24T08:05:13.641Z',
          id: 'af470cc1-08d8-4d39-be6f-b0eebc0a6480',
          ipnsRecord: {
            hash: 'QmW73w6jvat7zDpFkYHft8eB88LiU6fPyV9LUX9et7XRUy',
            id: 'clgkj9pfa000308meh73d8nff',
            name: 'k51qzi5uqu5dipwqop5kj5na30qlwqbyyn54g8y3jcm3sdc02t9tjlec2a46ci',
          },
          name: 'ens.eth',
          site: {
            id: 'clgove94b000208mlhq685zgh',
          },
          status: 'ACTIVE',
          updatedAt: '2023-03-24T08:05:13.641Z',
        },
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
];

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

export const handlers = [...queries, ...mutations];
