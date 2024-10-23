import { seeds } from '@fleek-platform/tester';
import { describe, expect, vi } from 'vitest';

import { mockDatabasesAndGraphqlWithBrowserSdkForEachTest } from '../testTools/mockDatabasesAndGraphqlWithBrowserSdkForEachTest';
import { mockDatabasesAndGraphqlWithNodeSdkForEachTest } from '../testTools/mockDatabasesAndGraphqlWithNodeSdkForEachTest';

vi.hoisted(() => {
  vi.resetModules();
});

vi.mock('@fleek-platform/graphql/node_modules/@fleek-platform/utils-token', async (importOriginal) => {
  const original = await importOriginal<typeof import('@fleek-platform/utils-token')>();

  return { ...original, createApplicationClientId: vi.fn().mockReturnValue('client_testtesttest') };
});

vi.mock('@fleek-platform/utils-token', async (importOriginal) => {
  const original = await importOriginal<typeof import('@fleek-platform/utils-token')>();

  return { ...original, createApplicationClientId: vi.fn().mockReturnValue('client_testtesttest') };
});

describe('[Node.js] ApplicationsClient', () => {
  const { it } = mockDatabasesAndGraphqlWithNodeSdkForEachTest({ mockIpfs: false });

  it('should get application', async (context) => {
    const response = await context.sdks.josh.applications().get({ id: seeds.auth.application.electronicCoMobileApp.id });

    expect(response).toMatchInlineSnapshot(`
      Object {
        "clientId": "client_SCmayempJ1d953yjn1yx",
        "createdAt": "2023-03-23T12:05:13.641Z",
        "id": "cli2ymypd000208l86gjd6p17",
        "name": "electronicCoMobileApp",
        "updatedAt": "2023-03-23T12:05:13.641Z",
        "whiteLabelDomains": Array [
          Object {
            "hostname": "app.best-electronic.co",
            "id": "clu2xf6uz000208jv6qskg1hm",
          },
          Object {
            "hostname": "app.electronic.co",
            "id": "clu2xd1bs000108jv0v0d2xmy",
          },
        ],
        "whitelistDomains": Array [
          Object {
            "hostname": "app.best-electronic.co",
            "id": "cli2z1zim000008l66z4l7qg3",
          },
          Object {
            "hostname": "app.electronic.co",
            "id": "cli2z10wq000208jw42gd4pyh",
          },
        ],
      }
    `);
  });

  it('should list applications', async (context) => {
    const response = await context.sdks.josh.applications().list();

    expect(response).toMatchInlineSnapshot(`
      Array [
        Object {
          "clientId": "client_ZRacrn3b1ForrjK5u8VD",
          "createdAt": "2023-03-23T11:05:13.641Z",
          "id": "cli2ymucu000108l81grqhzcp",
          "name": "electronicCoWebApp",
          "updatedAt": "2023-03-23T11:05:13.641Z",
          "whiteLabelDomains": Array [],
          "whitelistDomains": Array [],
        },
        Object {
          "clientId": "client_SCmayempJ1d953yjn1yx",
          "createdAt": "2023-03-23T12:05:13.641Z",
          "id": "cli2ymypd000208l86gjd6p17",
          "name": "electronicCoMobileApp",
          "updatedAt": "2023-03-23T12:05:13.641Z",
          "whiteLabelDomains": Array [
            Object {
              "hostname": "app.best-electronic.co",
              "id": "clu2xf6uz000208jv6qskg1hm",
            },
            Object {
              "hostname": "app.electronic.co",
              "id": "clu2xd1bs000108jv0v0d2xmy",
            },
          ],
          "whitelistDomains": Array [
            Object {
              "hostname": "app.best-electronic.co",
              "id": "cli2z1zim000008l66z4l7qg3",
            },
            Object {
              "hostname": "app.electronic.co",
              "id": "cli2z10wq000208jw42gd4pyh",
            },
          ],
        },
      ]
    `);
  });

  it('should create application', async (context) => {
    const response = await context.sdks.josh.applications().create({ name: 'test-application', whitelistDomains: ['fleek.xyz'] });

    expect(response).toMatchInlineSnapshot(
      {
        createdAt: expect.anything(),
        id: expect.any(String),
        updatedAt: expect.anything(),
      },
      `
      Object {
        "__typename": "Application",
        "clientId": "client_testtesttest",
        "createdAt": Anything,
        "id": Any<String>,
        "name": "test-application",
        "updatedAt": Anything,
      }
    `
    );
  });

  it('should update application', async (context) => {
    const response = await context.sdks.josh
      .applications()
      .update({ id: seeds.auth.application.electronicCoMobileApp.id, name: 'new-mobile-app-name' });

    expect(response).toMatchInlineSnapshot(
      { updatedAt: expect.anything() }, `
      Object {
        "clientId": "client_SCmayempJ1d953yjn1yx",
        "createdAt": "2023-03-23T12:05:13.641Z",
        "id": "cli2ymypd000208l86gjd6p17",
        "name": "new-mobile-app-name",
        "updatedAt": Anything,
        "whiteLabelDomains": Array [
          Object {
            "hostname": "app.best-electronic.co",
            "id": "clu2xf6uz000208jv6qskg1hm",
          },
          Object {
            "hostname": "app.electronic.co",
            "id": "clu2xd1bs000108jv0v0d2xmy",
          },
        ],
        "whitelistDomains": Array [
          Object {
            "hostname": "app.best-electronic.co",
            "id": "cli2z1zim000008l66z4l7qg3",
          },
          Object {
            "hostname": "app.electronic.co",
            "id": "cli2z10wq000208jw42gd4pyh",
          },
        ],
      }
    `);
  });

  it('should delete application', async (context) => {
    const response = await context.sdks.josh.applications().delete({
      id: seeds.auth.application.electronicCoMobileApp.id,
    });

    expect(response).toMatchInlineSnapshot(`
      Object {
        "clientId": "client_SCmayempJ1d953yjn1yx",
        "createdAt": "2023-03-23T12:05:13.641Z",
        "id": "cli2ymypd000208l86gjd6p17",
        "name": "electronicCoMobileApp",
        "updatedAt": "2023-03-23T12:05:13.641Z",
        "whiteLabelDomains": Array [
          Object {
            "hostname": "app.best-electronic.co",
            "id": "clu2xf6uz000208jv6qskg1hm",
          },
          Object {
            "hostname": "app.electronic.co",
            "id": "clu2xd1bs000108jv0v0d2xmy",
          },
        ],
        "whitelistDomains": Array [
          Object {
            "hostname": "app.best-electronic.co",
            "id": "cli2z1zim000008l66z4l7qg3",
          },
          Object {
            "hostname": "app.electronic.co",
            "id": "cli2z10wq000208jw42gd4pyh",
          },
        ],
      }
    `);
  });
});

describe.skip('[Chromium] ApplicationsClient', () => {
  const { it } = mockDatabasesAndGraphqlWithBrowserSdkForEachTest({ mockIpfs: false });

  it('should get application', async (context) => {
    const response = await context.sdks.josh({
      callback: () => window.sdk.applications().get({ id: window.seeds.auth.application.electronicCoMobileApp.id }),
    });

    expect(response).toMatchInlineSnapshot(`
      Object {
        "clientId": "client_SCmayempJ1d953yjn1yx",
        "createdAt": "2023-03-23T12:05:13.641Z",
        "id": "cli2ymypd000208l86gjd6p17",
        "name": "electronicCoMobileApp",
        "updatedAt": "2023-03-23T12:05:13.641Z",
        "whitelistDomains": Array [
          Object {
            "hostname": "app.electronic.co",
            "id": "cli2z10wq000208jw42gd4pyh",
          },
          Object {
            "hostname": "app.best-electronic.co",
            "id": "cli2z1zim000008l66z4l7qg3",
          },
        ],
        "whiteLabelDomains": Array [
          Object {
            "hostname": "app.electronic.co",
            "id": "cli2z10wq000208jw42gd4pyh",
          },
          Object {
            "hostname": "app.best-electronic.co",
            "id": "cli2z1zim000008l66z4l7qg3",
          },
        ],
      }
    `);
  });

  it('should list applications', async (context) => {
    const response = await context.sdks.josh({
      callback: () => window.sdk.applications().list(),
    });

    expect(response).toMatchInlineSnapshot(`
      Array [
        Object {
          "clientId": "client_ZRacrn3b1ForrjK5u8VD",
          "createdAt": "2023-03-23T11:05:13.641Z",
          "id": "cli2ymucu000108l81grqhzcp",
          "name": "electronicCoWebApp",
          "updatedAt": "2023-03-23T11:05:13.641Z",
          "whitelistDomains": Array [],
          "whiteLabelDomains": Array [],
        },
        Object {
          "clientId": "client_SCmayempJ1d953yjn1yx",
          "createdAt": "2023-03-23T12:05:13.641Z",
          "id": "cli2ymypd000208l86gjd6p17",
          "name": "electronicCoMobileApp",
          "updatedAt": "2023-03-23T12:05:13.641Z",
          "whitelistDomains": Array [
            Object {
              "hostname": "app.electronic.co",
              "id": "cli2z10wq000208jw42gd4pyh",
            },
            Object {
              "hostname": "app.best-electronic.co",
              "id": "cli2z1zim000008l66z4l7qg3",
            },
          ],
          "whiteLabelDomains": Array [
            Object {
              "hostname": "app.electronic.co",
              "id": "cli2z10wq000208jw42gd4pyh",
            },
            Object {
              "hostname": "app.best-electronic.co",
              "id": "cli2z1zim000008l66z4l7qg3",
            },
          ],
        },
      ]
    `);
  });

  it('should create application', async (context) => {
    const response = await context.sdks.josh({
      callback: () => window.sdk.applications().create({ name: 'test-application', whitelistDomains: ['https://fleek.xyz'] }),
    });

    expect(response).toMatchInlineSnapshot(
      {
        createdAt: expect.anything(),
        id: expect.any(String),
        updatedAt: expect.anything(),
        whitelistDomains: [{ id: expect.any(String) }],
      },
      `
      Object {
        "clientId": "client_testtesttest",
        "createdAt": Anything,
        "id": Any<String>,
        "name": "test-application",
        "updatedAt": Anything,
        "whitelistDomains": Array [
          Object {
            "hostname": "fleek.xyz",
            "id": Any<String>,
          },
        ],
        "whiteLabelDomains": Array [
          Object {
            "hostname": "fleek.xyz",
            "id": Any<String>,
          },
        ],
      }
    `
    );
  });

  it('should update application', async (context) => {
    const response = await context.sdks.josh({
      callback: () =>
        window.sdk.applications().update({ id: seeds.auth.application.electronicCoMobileApp.id, name: 'new-mobile-app-name' }),
    });

    expect(response).toMatchInlineSnapshot(
      { updatedAt: expect.anything() },
      `
      Object {
        "clientId": "client_SCmayempJ1d953yjn1yx",
        "createdAt": "2023-03-23T12:05:13.641Z",
        "id": "cli2ymypd000208l86gjd6p17",
        "name": "new-mobile-app-name",
        "updatedAt": Anything,
        "whitelistDomains": Array [
          Object {
            "hostname": "app.electronic.co",
            "id": "cli2z10wq000208jw42gd4pyh",
          },
          Object {
            "hostname": "app.best-electronic.co",
            "id": "cli2z1zim000008l66z4l7qg3",
          },
        ],
        "whiteLabelDomains": Array [
          Object {
            "hostname": "app.electronic.co",
            "id": "cli2z10wq000208jw42gd4pyh",
          },
          Object {
            "hostname": "app.best-electronic.co",
            "id": "cli2z1zim000008l66z4l7qg3",
          },
        ],
      }
    `
    );
  });

  it('should delete application', async (context) => {
    const response = await context.sdks.josh({
      callback: () => window.sdk.applications().delete({ id: seeds.auth.application.electronicCoMobileApp.id }),
    });

    expect(response).toMatchInlineSnapshot(`
      Object {
        "clientId": "client_SCmayempJ1d953yjn1yx",
        "createdAt": "2023-03-23T12:05:13.641Z",
        "id": "cli2ymypd000208l86gjd6p17",
        "name": "electronicCoMobileApp",
        "updatedAt": "2023-03-23T12:05:13.641Z",
        "whitelistDomains": Array [],
        "whiteLabelDomains": Array [],
      }
    `);
  });
});
