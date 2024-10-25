import { graphql as executeGraphql, buildSchema } from 'graphql';
import { HttpResponse } from 'msw';

import { localhost } from '@mocks/graphql/config';
import { schemaStr } from '@mocks/graphql/schema';

const schema = buildSchema(schemaStr);

const mutations = [
  localhost.mutation('PublishSignedIpnsName', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        publishSignedIpnsName:
          'k51qzi5uqu5dgsc1bvsuk1x84bptdvp8cupbnnbqxpxzd629gadpci3kpcm311',
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
  localhost.mutation('PublishIpnsRecord', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        publishIpnsRecord: {
          ensRecords: [
            {
              id: '8d3ad502-ec4d-489e-858e-d112656f3511',
            },
            {
              id: 'clm0mhccs000108ma34jn6ed3',
            },
          ],
          hash: 'QmRG4xcsmoZuXqKuPz3uVBgvo3GZ6k1kLZWhmvzuKtDr9s',
          id: 'clgkj995t000108med7gb2w4v',
          name: 'k51qzi5uqu5dhrupvn0ru1c6el43rhimh95cuiwqy0ofo8bgomvq296b49v9r7',
        },
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
  localhost.mutation('CreateIpnsRecord', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        createIpnsRecord: {
          ensRecords: [],
          hash: null,
          id: 'clgmg76ch000208mid5o30du0',
          name: 'test-name',
        },
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
  localhost.mutation(
    'CreateIpnsRecordForSite',
    async ({ query, variables }) => {
      const res = await executeGraphql({
        schema,
        source: query,
        variableValues: variables,
        rootValue: {
          createIpnsRecordForSite: {
            ensRecords: [],
            hash: 'bafybeibtme5hmkjxsryerf6pihhfbhifwnsz7gmhnfqglg2r326m4glzva',
            id: 'clgmg76ch000208mid5o30du0',
            name: 'test-name',
          },
        },
      });

      return HttpResponse.json({
        data: res.data,
        errors: res.errors,
      });
    },
  ),
];

export const handlers = [...mutations];
