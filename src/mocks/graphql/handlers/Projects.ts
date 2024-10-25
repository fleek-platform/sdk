import { graphql as executeGraphql, buildSchema } from 'graphql';
import { HttpResponse } from 'msw';

import { localhost } from '@mocks/graphql/config';
import { schemaStr } from '@mocks/graphql/schema';

const schema = buildSchema(schemaStr);

const queries = [
  localhost.query('GetProject', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        project: {
          avatar: null,
          backupStorageOnArweave: false,
          backupStorageOnFilecoin: false,
          createdAt: '2023-03-23T08:05:13.641Z',
          id: 'clgkiwjd8000c08mefyco2eoo',
          name: 'electronicCo',
        },
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
  localhost.query('GetProjects', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        projects: {
          data: [
            {
              avatar: null,
              backupStorageOnArweave: false,
              backupStorageOnFilecoin: false,
              createdAt: '2024-01-04T12:05:13.641Z',
              id: 'clt5ter6y000008jxd9lp8vez',
              name: 'dreamTeam',
            },
            {
              avatar: null,
              backupStorageOnArweave: false,
              backupStorageOnFilecoin: false,
              createdAt: '2023-03-23T08:05:13.641Z',
              id: 'clgkiwjd8000c08mefyco2eoo',
              name: 'electronicCo',
            },
            {
              avatar: null,
              backupStorageOnArweave: false,
              backupStorageOnFilecoin: false,
              createdAt: '2023-03-30T08:05:13.641Z',
              id: 'clgukvjww000108kw2h8n09nx',
              name: 'electronicLtd',
            },
            {
              avatar: 'd.png',
              backupStorageOnArweave: false,
              backupStorageOnFilecoin: false,
              createdAt: '2023-03-20T08:05:13.641Z',
              id: 'clgkivku7000a08me9coi0civ',
              name: 'vegetableCo',
            },
          ],
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

export const handlers = [...mutations, ...queries];
