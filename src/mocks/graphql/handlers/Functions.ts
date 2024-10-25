import { graphql as executeGraphql, buildSchema } from 'graphql';
import { HttpResponse } from 'msw';

import { localhost } from '@mocks/graphql/config';
import { schemaStr } from '@mocks/graphql/schema';

const schema = buildSchema(schemaStr);

const queries = [
  localhost.query('GetFleekFunctionByName', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        fleekFunctionByName: {
          currentDeployment: {
            cid: 'bafybeifyvm5aa2z35jnpehvg3hfflazesjfma53yekmhz7dckqn4buvr7q',
          },
          currentDeploymentId: 'clgmajsoo000108moef7f1yt0',
          id: 'clgma7ilu000008jzdlwhb76a',
          invokeUrl: 'blue-green-yellow.functions.on-fleek.app',
          name: 'electronic-co-shop',
          projectId: 'clgkiwjd8000c08mefyco2eoo',
          slug: 'blue-green-yellow',
          status: 'ACTIVE',
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
