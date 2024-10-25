import { graphql as executeGraphql, buildSchema } from 'graphql';
import { HttpResponse } from 'msw';

import { localhost } from '@mocks/graphql/config';
import { schemaStr } from '@mocks/graphql/schema';

const schema = buildSchema(schemaStr);

const queries = [
  localhost.query('GetSiteById', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        site: {
          deployments: [
            {
              __typename: 'Deployment',
              cid: 'bafybeibtme5hmkjxsryerf6pihhfbhifwnsz7gmhnfqglg2r326m4glzva',
              createdAt: '2023-03-24T10:05:13.641Z',
              id: 'clgmajwf7000208mo67lnhgu0',
              siteId: 'clgma7ilu000008jzdlwhb76a',
              status: 'BUILD_IN_PROGRESS',
              storageType: 'IPFS',
              updatedAt: '2023-03-24T10:06:13.641Z',
            },
            {
              __typename: 'Deployment',
              cid: 'bafybeifyvm5aa2z35jnpehvg3hfflazesjfma53yekmhz7dckqn4buvr7q',
              createdAt: '2023-03-24T09:05:13.641Z',
              id: 'clgmajsoo000108moef7f1yt0',
              siteId: 'clgma7ilu000008jzdlwhb76a',
              status: 'RELEASE_COMPLETED',
              storageType: 'IPFS',
              updatedAt: '2023-03-24T09:08:13.641Z',
            },
            {
              __typename: 'Deployment',
              cid: 'bafybeibtme5hmkjxsryerf6pihhfbhifwnsz7gmhnfqglg2r326m4glaaa',
              createdAt: '2023-03-23T10:05:13.641Z',
              id: 'clgmajwf7000208mo67lnh000',
              siteId: 'clgma7ilu000008jzdlwhb76a',
              status: 'RELEASE_COMPLETED',
              storageType: 'IPFS',
              updatedAt: '2023-03-23T10:05:13.641Z',
            },
          ],
          domains: [
            {
              __typename: 'Domain',
              hostname: 'electronic.co',
              id: 'clgmfj1pa000108lc0g5i7d32',
            },
            {
              __typename: 'Domain',
              hostname: 'eshop-electronic.co',
              id: 'clgmfj874000208lc2e9ccglf',
            },
            {
              __typename: 'Domain',
              hostname: 'static.eshop-electronic.co',
              id: 'clmhwwted000108mnajduel68',
            },
          ],
          id: 'clgma7ilu000008jzdlwhb76a',
          ipnsRecords: [
            {
              __typename: 'IpnsRecord',
              id: 'clgkj995t000108med7gb2w4v',
            },
          ],
          name: 'electronic-co-shop',
          slug: 'blue-green-yellow',
          zones: [
            {
              __typename: 'SiteZone',
              id: 'clgmfj874000208lc2e9ccglf',
              status: 'CREATED',
            },
            {
              __typename: 'SiteZone',
              id: 'cljfq6n2y000008lb4oy403bc',
              status: 'CREATED',
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
  localhost.query('GetSiteBySlug', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        siteBySlug: {
          deployments: [
            {
              __typename: 'Deployment',
              cid: 'bafybeibtme5hmkjxsryerf6pihhfbhifwnsz7gmhnfqglg2r326m4glzva',
              createdAt: '2023-03-24T10:05:13.641Z',
              id: 'clgmajwf7000208mo67lnhgu0',
              siteId: 'clgma7ilu000008jzdlwhb76a',
              status: 'BUILD_IN_PROGRESS',
              storageType: 'IPFS',
              updatedAt: '2023-03-24T10:06:13.641Z',
            },
            {
              __typename: 'Deployment',
              cid: 'bafybeifyvm5aa2z35jnpehvg3hfflazesjfma53yekmhz7dckqn4buvr7q',
              createdAt: '2023-03-24T09:05:13.641Z',
              id: 'clgmajsoo000108moef7f1yt0',
              siteId: 'clgma7ilu000008jzdlwhb76a',
              status: 'RELEASE_COMPLETED',
              storageType: 'IPFS',
              updatedAt: '2023-03-24T09:08:13.641Z',
            },
            {
              __typename: 'Deployment',
              cid: 'bafybeibtme5hmkjxsryerf6pihhfbhifwnsz7gmhnfqglg2r326m4glaaa',
              createdAt: '2023-03-23T10:05:13.641Z',
              id: 'clgmajwf7000208mo67lnh000',
              siteId: 'clgma7ilu000008jzdlwhb76a',
              status: 'RELEASE_COMPLETED',
              storageType: 'IPFS',
              updatedAt: '2023-03-23T10:05:13.641Z',
            },
          ],
          domains: [
            {
              __typename: 'Domain',
              hostname: 'electronic.co',
              id: 'clgmfj1pa000108lc0g5i7d32',
            },
            {
              __typename: 'Domain',
              hostname: 'eshop-electronic.co',
              id: 'clgmfj874000208lc2e9ccglf',
            },
            {
              __typename: 'Domain',
              hostname: 'static.eshop-electronic.co',
              id: 'clmhwwted000108mnajduel68',
            },
          ],
          id: 'clgma7ilu000008jzdlwhb76a',
          ipnsRecords: [
            {
              __typename: 'IpnsRecord',
              id: 'clgkj995t000108med7gb2w4v',
            },
          ],
          name: 'electronic-co-shop',
          slug: 'blue-green-yellow',
          zones: [
            {
              __typename: 'SiteZone',
              id: 'clgmfj874000208lc2e9ccglf',
              status: 'CREATED',
            },
            {
              __typename: 'SiteZone',
              id: 'cljfq6n2y000008lb4oy403bc',
              status: 'CREATED',
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

export const handlers = [...queries];
