import {
  describe,
  expect,
  it,
  afterAll,
  afterEach,
  beforeAll,
  vi,
} from 'vitest';
import { server } from '../mocks/graphql/node';
import { mockGraphqlServiceApiUrl as graphqlServiceApiUrl } from '../mocks/graphql/handlers';
import { FleekSdk } from '../FleekSdk';
import state from '../mocks/state';

vi.mock('@aws-sdk/client-sfn', () => ({
  SFNClient: vi.fn(() => ({
    send: vi.fn().mockResolvedValue({}),
  })),
  StartExecutionCommand: vi.fn().mockResolvedValue({}),
}));

describe('Domains', () => {
  const sdk = new FleekSdk({
    graphqlServiceApiUrl,
    accessTokenService: {} as any,
  });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should list domains', async () => {
    const response = await sdk.domains().list();

    expect(response).toMatchInlineSnapshot(`
      Array [
        Object {
          "__typename": "Domain",
          "createdAt": "2023-03-24T09:05:13.641Z",
          "dnsConfigs": Array [
            Object {
              "__typename": "DnsConfig",
              "createdAt": "2023-03-23T09:05:13.641Z",
              "id": "clgmg76ch000208mid5o30du0",
              "name": "hostname",
              "type": "CNAME",
              "updatedAt": "2023-03-23T09:05:13.641Z",
              "value": "clgmfj874000208lc2e9ccglf.b-cdn.net",
            },
            Object {
              "__typename": "DnsConfig",
              "createdAt": "2023-03-23T10:05:13.641Z",
              "id": "clgmgbj4h000308mi8aai0pli",
              "name": "hostname",
              "type": "CNAME",
              "updatedAt": "2023-03-23T10:05:13.641Z",
              "value": "clgmfj874000208lc2e9ccglf.b-cdn.net",
            },
          ],
          "hostname": "electronic.co",
          "id": "clgmfj1pa000108lc0g5i7d32",
          "isVerified": true,
          "status": "ACTIVE",
          "updatedAt": "2023-03-24T09:05:13.641Z",
          "zone": Object {
            "__typename": "Zone",
            "id": "clgmfj874000208lc2e9ccglf",
          },
        },
        Object {
          "__typename": "Domain",
          "createdAt": "2023-03-24T10:05:13.641Z",
          "dnsConfigs": Array [],
          "hostname": "eshop-electronic.co",
          "id": "clgmfj874000208lc2e9ccglf",
          "isVerified": false,
          "status": "VERIFYING_FAILED",
          "updatedAt": "2023-03-24T10:05:13.641Z",
          "zone": Object {
            "__typename": "Zone",
            "id": "clgmfj874000208lc2e9ccglf",
          },
        },
        Object {
          "__typename": "Domain",
          "createdAt": "2023-03-28T10:05:13.641Z",
          "dnsConfigs": Array [
            Object {
              "__typename": "DnsConfig",
              "createdAt": "2023-02-28T10:04:33.641Z",
              "id": "cln2226gc000208la1egftrd4",
              "name": "_dnslink",
              "type": "CNAME",
              "updatedAt": "2023-02-28T10:04:33.641Z",
              "value": "blue-green-yellow.dev.on-fleek-test.app",
            },
          ],
          "hostname": "blog-electornic.co",
          "id": "clgnslqvg000108l6hg5ea3u0",
          "isVerified": false,
          "status": "CREATING",
          "updatedAt": "2023-03-28T10:05:13.641Z",
          "zone": Object {
            "__typename": "Zone",
            "id": "clgow7wob000508jog5gfanj9",
          },
        },
        Object {
          "__typename": "Domain",
          "createdAt": "2023-03-28T10:05:13.641Z",
          "dnsConfigs": Array [
            Object {
              "__typename": "DnsConfig",
              "createdAt": "2023-02-28T10:04:33.641Z",
              "id": "ckmhgsu0x011008mney5h0bu",
              "name": "_dnslink",
              "type": "CNAME",
              "updatedAt": "2023-02-28T10:04:33.641Z",
              "value": "_dnslink.white-black-silver.dev.on-fleek-test.app",
            },
          ],
          "hostname": "dnslink-electornic.co",
          "id": "clgnslqvg000108l6hg5ea3u1",
          "isVerified": true,
          "status": "ACTIVE",
          "updatedAt": "2023-03-28T10:05:13.641Z",
          "zone": Object {
            "__typename": "Zone",
            "id": "clgow7wob000508jog5gfanj9",
          },
        },
        Object {
          "__typename": "Domain",
          "createdAt": "2023-03-24T10:05:13.641Z",
          "dnsConfigs": Array [
            Object {
              "__typename": "DnsConfig",
              "createdAt": "2023-02-28T10:04:33.641Z",
              "id": "ckmhgsu0x011008mney3h03bu",
              "name": "_dnslink",
              "type": "CNAME",
              "updatedAt": "2023-02-28T10:04:33.641Z",
              "value": "one-knife-yellow.dev.on-fleek-test.app",
            },
          ],
          "hostname": "static.eshop-electronic.co",
          "id": "clmhwwted000108mnajduel68",
          "isVerified": true,
          "status": "ACTIVE",
          "updatedAt": "2023-03-24T10:05:13.641Z",
          "zone": Object {
            "__typename": "Zone",
            "id": "cljfq6n2y000008lb4oy403bc",
          },
        },
        Object {
          "__typename": "Domain",
          "createdAt": "2023-02-28T10:05:13.641Z",
          "dnsConfigs": Array [
            Object {
              "__typename": "DnsConfig",
              "createdAt": "2023-02-28T10:04:33.641Z",
              "id": "cln2226gc000208la1egogfn3",
              "name": "hostname",
              "type": "CNAME",
              "updatedAt": "2023-02-28T10:04:33.641Z",
              "value": "cljfqzrcg000208jy6677aqv1.fleekcdn.xyz",
            },
            Object {
              "__typename": "DnsConfig",
              "createdAt": "2023-02-28T10:04:33.641Z",
              "id": "cln2226gc000208laurhtg4d5",
              "name": "_dnslink",
              "type": "CNAME",
              "updatedAt": "2023-02-28T10:04:33.641Z",
              "value": "blue-green-yellow.dev.on-fleek-test.app",
            },
          ],
          "hostname": "documents-electronic.co",
          "id": "cln21wwwa000008la7e0kbvd7",
          "isVerified": false,
          "status": "CREATED",
          "updatedAt": "2023-02-28T10:05:13.641Z",
          "zone": Object {
            "__typename": "Zone",
            "id": "cljfqzrcg000208jy6677aqv1",
          },
        },
      ]
    `);
  });

  it('should get domain by its id', async (context) => {
    const response = await sdk.domains().get({
      domainId: state.domains.domain.electronicCoPrimary.id,
    });

    expect(response).toMatchInlineSnapshot(`
      Object {
        "__typename": "Domain",
        "createdAt": "2023-03-24T09:05:13.641Z",
        "dnsConfigs": Array [
          Object {
            "__typename": "DnsConfig",
            "createdAt": "2023-03-23T09:05:13.641Z",
            "id": "clgmg76ch000208mid5o30du0",
            "name": "hostname",
            "type": "CNAME",
            "updatedAt": "2023-03-23T09:05:13.641Z",
            "value": "clgmfj874000208lc2e9ccglf.b-cdn.net",
          },
          Object {
            "__typename": "DnsConfig",
            "createdAt": "2023-03-23T10:05:13.641Z",
            "id": "clgmgbj4h000308mi8aai0pli",
            "name": "hostname",
            "type": "CNAME",
            "updatedAt": "2023-03-23T10:05:13.641Z",
            "value": "clgmfj874000208lc2e9ccglf.b-cdn.net",
          },
        ],
        "hostname": "electronic.co",
        "id": "clgmfj1pa000108lc0g5i7d32",
        "isVerified": true,
        "status": "ACTIVE",
        "updatedAt": "2023-03-24T09:05:13.641Z",
        "zone": Object {
          "__typename": "Zone",
          "id": "clgmfj874000208lc2e9ccglf",
        },
      }
    `);
  });

  it('should get domains by its hostname', async () => {
    const response = await sdk.domains().getByHostname({
      hostname: state.domains.domain.electronicCoPrimary.hostname,
    });

    expect(response).toMatchInlineSnapshot(`
        Object {
          "__typename": "Domain",
          "createdAt": "2023-03-24T09:05:13.641Z",
          "dnsConfigs": Array [
            Object {
              "__typename": "DnsConfig",
              "createdAt": "2023-03-23T09:05:13.641Z",
              "id": "clgmg76ch000208mid5o30du0",
              "name": "hostname",
              "type": "CNAME",
              "updatedAt": "2023-03-23T09:05:13.641Z",
              "value": "clgmfj874000208lc2e9ccglf.b-cdn.net",
            },
            Object {
              "__typename": "DnsConfig",
              "createdAt": "2023-03-23T10:05:13.641Z",
              "id": "clgmgbj4h000308mi8aai0pli",
              "name": "hostname",
              "type": "CNAME",
              "updatedAt": "2023-03-23T10:05:13.641Z",
              "value": "clgmfj874000208lc2e9ccglf.b-cdn.net",
            },
          ],
          "hostname": "electronic.co",
          "id": "clgmfj1pa000108lc0g5i7d32",
          "isVerified": true,
          "status": "ACTIVE",
          "updatedAt": "2023-03-24T09:05:13.641Z",
          "zone": Object {
            "__typename": "Zone",
            "id": "clgmfj874000208lc2e9ccglf",
          },
        }
      `);
  });

  it('should list domains by the zone id', async (context) => {
    const response = await sdk
      .domains()
      .listByZoneId({ zoneId: state.domains.zone.electronicCoEshop.id });

    expect(response).toMatchInlineSnapshot(`
      Array [
        Object {
          "__typename": "Domain",
          "createdAt": "2023-03-24T09:05:13.641Z",
          "dnsConfigs": Array [
            Object {
              "__typename": "DnsConfig",
              "createdAt": "2023-03-23T09:05:13.641Z",
              "id": "clgmg76ch000208mid5o30du0",
              "name": "hostname",
              "type": "CNAME",
              "updatedAt": "2023-03-23T09:05:13.641Z",
              "value": "clgmfj874000208lc2e9ccglf.b-cdn.net",
            },
            Object {
              "__typename": "DnsConfig",
              "createdAt": "2023-03-23T10:05:13.641Z",
              "id": "clgmgbj4h000308mi8aai0pli",
              "name": "hostname",
              "type": "CNAME",
              "updatedAt": "2023-03-23T10:05:13.641Z",
              "value": "clgmfj874000208lc2e9ccglf.b-cdn.net",
            },
          ],
          "hostname": "electronic.co",
          "id": "clgmfj1pa000108lc0g5i7d32",
          "isVerified": true,
          "status": "ACTIVE",
          "updatedAt": "2023-03-24T09:05:13.641Z",
          "zone": Object {
            "__typename": "Zone",
            "id": "clgmfj874000208lc2e9ccglf",
          },
        },
        Object {
          "__typename": "Domain",
          "createdAt": "2023-03-24T10:05:13.641Z",
          "dnsConfigs": Array [],
          "hostname": "eshop-electronic.co",
          "id": "clgmfj874000208lc2e9ccglf",
          "isVerified": false,
          "status": "VERIFYING_FAILED",
          "updatedAt": "2023-03-24T10:05:13.641Z",
          "zone": Object {
            "__typename": "Zone",
            "id": "clgmfj874000208lc2e9ccglf",
          },
        },
      ]
    `);
  });

  it('should create domain', async () => {
    const response = await sdk.domains().createDomain({
      hostname: 'super-eshop.xyz',
      zoneId: state.domains.zone.electronicCoEshop.id,
    });

    expect(response).toMatchInlineSnapshot(
      {
        createdAt: expect.anything(),
        id: expect.any(String),
        updatedAt: expect.anything(),
      },
      `
      Object {
        "__typename": "Domain",
        "createdAt": Anything,
        "dnslinkStatus": null,
        "errorMessage": null,
        "hostname": "super-eshop.xyz",
        "id": Any<String>,
        "isVerified": false,
        "status": "CREATING",
        "updatedAt": Anything,
      }
    `,
    );
  });

  it('should delete domain', async () => {
    const response = await sdk.domains().deleteDomain({
      domainId: state.domains.domain.electronicCoPrimary.zoneId,
    });

    expect(response).toMatchInlineSnapshot(
      { updatedAt: expect.anything() },
      `
      Object {
        "__typename": "Domain",
        "createdAt": "2023-03-24T10:05:13.641Z",
        "dnsConfigs": Array [],
        "hostname": "eshop-electronic.co",
        "id": "clgmfj874000208lc2e9ccglf",
        "isVerified": false,
        "status": "DELETING",
        "updatedAt": Anything,
        "zone": Object {
          "__typename": "Zone",
          "id": "clgmfj874000208lc2e9ccglf",
        },
      }
    `,
    );
  });

  it('should verify domain', async () => {
    const response = await sdk
      .domains()
      .verifyDomain({ domainId: state.domains.domain.electronicCoEshop.id });

    expect(response).toMatchInlineSnapshot(
      { updatedAt: expect.anything() },
      `
      Object {
        "__typename": "Domain",
        "createdAt": "2023-03-24T10:05:13.641Z",
        "dnsConfigs": Array [],
        "hostname": "eshop-electronic.co",
        "id": "clgmfj874000208lc2e9ccglf",
        "isVerified": false,
        "status": "VERIFYING",
        "updatedAt": Anything,
        "zone": Object {
          "__typename": "Zone",
          "id": "clgmfj874000208lc2e9ccglf",
        },
      }
    `,
    );
  });

  it('should list zones', async () => {
    const response = await sdk.domains().listZones();

    expect(response).toMatchInlineSnapshot(`
      Array [
        Object {
          "__typename": "Zone",
          "createdAt": "2022-12-24T09:04:13.641Z",
          "id": "clgmfj874000208lc2e9ccglf",
          "originUrl": "https://ipfs.io/ipfs/QmXYsy8xLYRaDbgDNeSthWSNneKM13Vb1FHV8LC4DghHy2",
          "status": "CREATED",
          "type": "SITE",
          "updatedAt": "2022-12-24T09:04:13.641Z",
        },
        Object {
          "__typename": "Zone",
          "createdAt": "2022-12-28T10:04:13.641Z",
          "id": "clgow7wob000508jog5gfanj9",
          "originUrl": "https://bafybeifyvm5aa2z35jnpehvg3hfflazesjfma53yekmhz7dckqn4buvr7q.ipfs.gateway-ipfs.fleeksandbox.xyz",
          "status": "CREATED",
          "type": "SITE",
          "updatedAt": "2022-12-28T10:04:13.641Z",
        },
        Object {
          "__typename": "Zone",
          "createdAt": "2022-04-25T09:04:13.641Z",
          "id": "clj76kw6i000008l2ekmz6ahd",
          "originUrl": "https://bafybeib5qbrx6xdrdvuxt2wsvfsrwwvu42bfh6pycm677qjkl66heelc2e.ipfs.gateway-ipfs.fleeksandbox.xyz",
          "status": "CREATED",
          "type": "PRIVATE_GATEWAY",
          "updatedAt": "2022-04-25T10:04:13.641Z",
        },
        Object {
          "__typename": "Zone",
          "createdAt": "2022-12-30T11:04:13.641Z",
          "id": "clje357cc000108jse08c2t6m",
          "originUrl": "https://ipfs.io/ipfs/QmdG8HaQAYccz22zLgJ33trzu8g6wjF6e48YbBEZhbz342",
          "status": "CREATING_FAILED",
          "type": "SITE",
          "updatedAt": "2022-12-30T11:04:13.641Z",
        },
        Object {
          "__typename": "Zone",
          "createdAt": "2022-12-24T09:04:13.641Z",
          "id": "cljfq6n2y000008lb4oy403bc",
          "originUrl": "https://dedicated-gateway-ipfs.fleeksandbox.xyz",
          "status": "CREATED",
          "type": "PRIVATE_GATEWAY",
          "updatedAt": "2022-12-24T09:04:13.641Z",
        },
        Object {
          "__typename": "Zone",
          "createdAt": "2023-02-28T10:04:13.641Z",
          "id": "cljfqzrcg000208jy6677aqv1",
          "originUrl": "https://dedicated-gateway-ipfs.fleeksandbox.xyz",
          "status": "CREATED",
          "type": "PRIVATE_GATEWAY",
          "updatedAt": "2023-02-28T10:04:13.641Z",
        },
      ]
    `);
  });

  it('should get zone by its id', async (context) => {
    const response = await sdk
      .domains()
      .getZone({ id: state.domains.zone.electronicCoEshop.id });

    expect(response).toMatchInlineSnapshot(`
      Object {
        "__typename": "Zone",
        "createdAt": "2022-12-24T09:04:13.641Z",
        "id": "clgmfj874000208lc2e9ccglf",
        "originUrl": "https://ipfs.io/ipfs/QmXYsy8xLYRaDbgDNeSthWSNneKM13Vb1FHV8LC4DghHy2",
        "status": "CREATED",
        "type": "SITE",
        "updatedAt": "2022-12-24T09:04:13.641Z",
      }
    `);
  });

  it('should create zone for site', async (context) => {
    const response = await sdk
      .domains()
      .createZoneForSite({ siteId: state.sites.site.electronicCoEshop.id });

    expect(response).toMatchInlineSnapshot(
      {
        createdAt: expect.anything(),
        id: expect.any(String),
        updatedAt: expect.anything(),
      },
      `
      Object {
        "__typename": "Zone",
        "createdAt": Anything,
        "id": Any<String>,
        "originUrl": "https://bafybeibtme5hmkjxsryerf6pihhfbhifwnsz7gmhnfqglg2r326m4glzva.ipfs.gateway-ipfs.fleeksandbox.xyz",
        "originUrlChangedAt": null,
        "status": "CREATING",
        "type": "SITE",
        "updatedAt": Anything,
      }
    `,
    );
  });

  it('should create zone for private gateway', async (context) => {
    const response = await sdk.domains().createZoneForPrivateGateway();

    expect(response).toMatchInlineSnapshot(
      {
        createdAt: expect.anything(),
        id: expect.any(String),
        updatedAt: expect.anything(),
      },
      `
      Object {
        "__typename": "Zone",
        "createdAt": Anything,
        "id": Any<String>,
        "originUrl": "https://storage.dev.on-fleek-test.app",
        "status": "CREATING",
        "type": "PRIVATE_GATEWAY",
        "updatedAt": Anything,
      }
    `,
    );
  });

  it('should delete zone', async () => {
    const response = await sdk
      .domains()
      .deleteZone({ id: state.domains.zone.electronicCoVideos.id });

    expect(response).toMatchInlineSnapshot(
      { updatedAt: expect.anything() },
      `
      Object {
        "__typename": "Zone",
        "createdAt": "2022-12-30T11:04:13.641Z",
        "id": "clje357cc000108jse08c2t6m",
        "originUrl": "https://ipfs.io/ipfs/QmdG8HaQAYccz22zLgJ33trzu8g6wjF6e48YbBEZhbz342",
        "status": "DELETING",
        "type": "SITE",
        "updatedAt": Anything,
      }
    `,
    );
  });
});
