import { graphql as executeGraphql, buildSchema } from 'graphql';
import { HttpResponse } from 'msw';

import { localhost } from '@mocks/graphql/config';
import { schemaStr } from '@mocks/graphql/schema';

const schema = buildSchema(schemaStr);

const queries = [
  localhost.query('GetDomains', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        domains: {
          data: [
            {
              __typename: 'Domain',
              createdAt: '2023-03-24T09:05:13.641Z',
              dnsConfigs: [
                {
                  __typename: 'DnsConfig',
                  createdAt: '2023-03-23T09:05:13.641Z',
                  id: 'clgmg76ch000208mid5o30du0',
                  name: 'hostname',
                  type: 'CNAME',
                  updatedAt: '2023-03-23T09:05:13.641Z',
                  value: 'clgmfj874000208lc2e9ccglf.b-cdn.net',
                },
                {
                  __typename: 'DnsConfig',
                  createdAt: '2023-03-23T10:05:13.641Z',
                  id: 'clgmgbj4h000308mi8aai0pli',
                  name: 'hostname',
                  type: 'CNAME',
                  updatedAt: '2023-03-23T10:05:13.641Z',
                  value: 'clgmfj874000208lc2e9ccglf.b-cdn.net',
                },
              ],
              hostname: 'electronic.co',
              id: 'clgmfj1pa000108lc0g5i7d32',
              isVerified: true,
              status: 'ACTIVE',
              updatedAt: '2023-03-24T09:05:13.641Z',
              zone: {
                __typename: 'Zone',
                id: 'clgmfj874000208lc2e9ccglf',
              },
            },
            {
              __typename: 'Domain',
              createdAt: '2023-03-24T10:05:13.641Z',
              dnsConfigs: [],
              hostname: 'eshop-electronic.co',
              id: 'clgmfj874000208lc2e9ccglf',
              isVerified: false,
              status: 'VERIFYING_FAILED',
              updatedAt: '2023-03-24T10:05:13.641Z',
              zone: {
                __typename: 'Zone',
                id: 'clgmfj874000208lc2e9ccglf',
              },
            },
            {
              __typename: 'Domain',
              createdAt: '2023-03-28T10:05:13.641Z',
              dnsConfigs: [
                {
                  __typename: 'DnsConfig',
                  createdAt: '2023-02-28T10:04:33.641Z',
                  id: 'cln2226gc000208la1egftrd4',
                  name: '_dnslink',
                  type: 'CNAME',
                  updatedAt: '2023-02-28T10:04:33.641Z',
                  value: 'blue-green-yellow.dev.on-fleek-test.app',
                },
              ],
              hostname: 'blog-electornic.co',
              id: 'clgnslqvg000108l6hg5ea3u0',
              isVerified: false,
              status: 'CREATING',
              updatedAt: '2023-03-28T10:05:13.641Z',
              zone: {
                __typename: 'Zone',
                id: 'clgow7wob000508jog5gfanj9',
              },
            },
            {
              __typename: 'Domain',
              createdAt: '2023-03-28T10:05:13.641Z',
              dnsConfigs: [
                {
                  __typename: 'DnsConfig',
                  createdAt: '2023-02-28T10:04:33.641Z',
                  id: 'ckmhgsu0x011008mney5h0bu',
                  name: '_dnslink',
                  type: 'CNAME',
                  updatedAt: '2023-02-28T10:04:33.641Z',
                  value: '_dnslink.white-black-silver.dev.on-fleek-test.app',
                },
              ],
              hostname: 'dnslink-electornic.co',
              id: 'clgnslqvg000108l6hg5ea3u1',
              isVerified: true,
              status: 'ACTIVE',
              updatedAt: '2023-03-28T10:05:13.641Z',
              zone: {
                __typename: 'Zone',
                id: 'clgow7wob000508jog5gfanj9',
              },
            },
            {
              __typename: 'Domain',
              createdAt: '2023-03-24T10:05:13.641Z',
              dnsConfigs: [
                {
                  __typename: 'DnsConfig',
                  createdAt: '2023-02-28T10:04:33.641Z',
                  id: 'ckmhgsu0x011008mney3h03bu',
                  name: '_dnslink',
                  type: 'CNAME',
                  updatedAt: '2023-02-28T10:04:33.641Z',
                  value: 'one-knife-yellow.dev.on-fleek-test.app',
                },
              ],
              hostname: 'static.eshop-electronic.co',
              id: 'clmhwwted000108mnajduel68',
              isVerified: true,
              status: 'ACTIVE',
              updatedAt: '2023-03-24T10:05:13.641Z',
              zone: {
                __typename: 'Zone',
                id: 'cljfq6n2y000008lb4oy403bc',
              },
            },
            {
              __typename: 'Domain',
              createdAt: '2023-02-28T10:05:13.641Z',
              dnsConfigs: [
                {
                  __typename: 'DnsConfig',
                  createdAt: '2023-02-28T10:04:33.641Z',
                  id: 'cln2226gc000208la1egogfn3',
                  name: 'hostname',
                  type: 'CNAME',
                  updatedAt: '2023-02-28T10:04:33.641Z',
                  value: 'cljfqzrcg000208jy6677aqv1.fleekcdn.xyz',
                },
                {
                  __typename: 'DnsConfig',
                  createdAt: '2023-02-28T10:04:33.641Z',
                  id: 'cln2226gc000208laurhtg4d5',
                  name: '_dnslink',
                  type: 'CNAME',
                  updatedAt: '2023-02-28T10:04:33.641Z',
                  value: 'blue-green-yellow.dev.on-fleek-test.app',
                },
              ],
              hostname: 'documents-electronic.co',
              id: 'cln21wwwa000008la7e0kbvd7',
              isVerified: false,
              status: 'CREATED',
              updatedAt: '2023-02-28T10:05:13.641Z',
              zone: {
                __typename: 'Zone',
                id: 'cljfqzrcg000208jy6677aqv1',
              },
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
  localhost.query('GetDomainById', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        domain: {
          __typename: 'Domain',
          createdAt: '2023-03-24T09:05:13.641Z',
          dnsConfigs: [
            {
              __typename: 'DnsConfig',
              createdAt: '2023-03-23T09:05:13.641Z',
              id: 'clgmg76ch000208mid5o30du0',
              name: 'hostname',
              type: 'CNAME',
              updatedAt: '2023-03-23T09:05:13.641Z',
              value: 'clgmfj874000208lc2e9ccglf.b-cdn.net',
            },
            {
              __typename: 'DnsConfig',
              createdAt: '2023-03-23T10:05:13.641Z',
              id: 'clgmgbj4h000308mi8aai0pli',
              name: 'hostname',
              type: 'CNAME',
              updatedAt: '2023-03-23T10:05:13.641Z',
              value: 'clgmfj874000208lc2e9ccglf.b-cdn.net',
            },
          ],
          hostname: 'electronic.co',
          id: 'clgmfj1pa000108lc0g5i7d32',
          isVerified: true,
          status: 'ACTIVE',
          updatedAt: '2023-03-24T09:05:13.641Z',
          zone: {
            __typename: 'Zone',
            id: 'clgmfj874000208lc2e9ccglf',
          },
        },
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
  localhost.query('GetDomainByHostname', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        domainByHostname: {
          __typename: 'Domain',
          createdAt: '2023-03-24T09:05:13.641Z',
          dnsConfigs: [
            {
              __typename: 'DnsConfig',
              createdAt: '2023-03-23T09:05:13.641Z',
              id: 'clgmg76ch000208mid5o30du0',
              name: 'hostname',
              type: 'CNAME',
              updatedAt: '2023-03-23T09:05:13.641Z',
              value: 'clgmfj874000208lc2e9ccglf.b-cdn.net',
            },
            {
              __typename: 'DnsConfig',
              createdAt: '2023-03-23T10:05:13.641Z',
              id: 'clgmgbj4h000308mi8aai0pli',
              name: 'hostname',
              type: 'CNAME',
              updatedAt: '2023-03-23T10:05:13.641Z',
              value: 'clgmfj874000208lc2e9ccglf.b-cdn.net',
            },
          ],
          hostname: 'electronic.co',
          id: 'clgmfj1pa000108lc0g5i7d32',
          isVerified: true,
          status: 'ACTIVE',
          updatedAt: '2023-03-24T09:05:13.641Z',
          zone: {
            __typename: 'Zone',
            id: 'clgmfj874000208lc2e9ccglf',
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
