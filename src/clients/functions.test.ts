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

vi.mock('@fleek-platform/graphql/node_modules/@fleek-platform/utils-text', () => ({
  generateSlug: vi.fn().mockReturnValue('crooked-bland-jackal'),
}));

vi.mock('@fleek-platform/utils-text', () => ({
  generateSlug: vi.fn().mockReturnValue('crooked-bland-jackal'),
}));

describe('[Node.js] FunctionsClient', () => {
  const { it } = mockDatabasesAndGraphqlWithNodeSdkForEachTest({ mockIpfs: false });

  it('should get function by its name', async (context) => {
    const response = await context.sdks.josh.functions().get({
      name: seeds.fleekFunctions.fleekFunction.electronicCoEshop.name
    });

    expect(response).toMatchInlineSnapshot(`
      Object {
        "currentDeployment": Object {
          "cid": "bafybeifyvm5aa2z35jnpehvg3hfflazesjfma53yekmhz7dckqn4buvr7q",
        },
        "currentDeploymentId": "clgmajsoo000108moef7f1yt0",
        "id": "clgma7ilu000008jzdlwhb76a",
        "invokeUrl": "blue-green-yellow.functions.on-fleek.app",
        "name": "electronic-co-shop",
        "projectId": "clgkiwjd8000c08mefyco2eoo",
        "slug": "blue-green-yellow",
        "status": "ACTIVE",
      }
    `);
  });

  it('list functions', async (context) => {
    const response = await context.sdks.josh.functions().list();

    expect(response).toMatchInlineSnapshot(`
      Array [
        Object {
          "currentDeployment": Object {
            "cid": "bafybeifcesfwifuhcshuobdgw6kod4jzinu4u4v2lzjzdmps3ndaydrsri",
          },
          "currentDeploymentId": "clmz7kxj60003mk08eg5wmtqh",
          "id": "clmkp5nn50000mm08yq7hierx",
          "invokeUrl": "red-green-blue.functions.on-fleek.app",
          "name": "electronicCoLanding",
          "projectId": "clgkiwjd8000c08mefyco2eoo",
          "slug": "red-green-blue",
          "status": "ACTIVE",
        },
        Object {
          "currentDeployment": null,
          "currentDeploymentId": null,
          "id": "clgma7mmh000108jzd13c50ol",
          "invokeUrl": "white-black-silver.functions.on-fleek.app",
          "name": "electronic-co-blog",
          "projectId": "clgkiwjd8000c08mefyco2eoo",
          "slug": "white-black-silver",
          "status": "ACTIVE",
        },
        Object {
          "currentDeployment": null,
          "currentDeploymentId": null,
          "id": "clje32iwx000008js9rjb5uoo",
          "invokeUrl": "green-gold-silver.functions.on-fleek.app",
          "name": "electronic-co-videos",
          "projectId": "clgkiwjd8000c08mefyco2eoo",
          "slug": "green-gold-silver",
          "status": "ACTIVE",
        },
        Object {
          "currentDeployment": Object {
            "cid": "bafybeifyvm5aa2z35jnpehvg3hfflazesjfma53yekmhz7dckqn4buvr7q",
          },
          "currentDeploymentId": "clgmajsoo000108moef7f1yt0",
          "id": "clgma7ilu000008jzdlwhb76a",
          "invokeUrl": "blue-green-yellow.functions.on-fleek.app",
          "name": "electronic-co-shop",
          "projectId": "clgkiwjd8000c08mefyco2eoo",
          "slug": "blue-green-yellow",
          "status": "ACTIVE",
        },
        Object {
          "currentDeployment": null,
          "currentDeploymentId": null,
          "id": "clm93utuz000108laem2a4pe4",
          "invokeUrl": "blue-gold-yellow.functions.on-fleek.app",
          "name": "electronic-co-deprecated",
          "projectId": "clgkiwjd8000c08mefyco2eoo",
          "slug": "blue-gold-yellow",
          "status": "ACTIVE",
        },
      ]
    `);
  });

  it('should create function', async (context) => {
    const response = await context.sdks.josh.functions().create({
      name: 'new-function',
    });

    expect(response).toMatchInlineSnapshot({ id: expect.any(String) }, `
      Object {
        "currentDeployment": null,
        "currentDeploymentId": null,
        "id": Any<String>,
        "invokeUrl": "https://crooked-bland-jackal.dev.on-fleek-functions.app",
        "name": "new-function",
        "projectId": "clgkiwjd8000c08mefyco2eoo",
        "slug": "crooked-bland-jackal",
        "status": "ACTIVE",
      }
    `);
  });

  it('should delete function', async (context) => {
    const response = await context.sdks.josh.functions().delete({
      id: seeds.fleekFunctions.fleekFunction.electronicCoVideos.id,
    });

    expect(response).toMatchInlineSnapshot(`
      Object {
        "currentDeployment": null,
        "currentDeploymentId": null,
        "id": "clje32iwx000008js9rjb5uoo",
        "invokeUrl": "green-gold-silver.functions.on-fleek.app",
        "name": "electronic-co-videos",
        "projectId": "clgkiwjd8000c08mefyco2eoo",
        "slug": "green-gold-silver",
        "status": "ACTIVE",
      }
    `);
  });

  describe.skip('[Chromium] FunctionsClient', () => {
    const { it } = mockDatabasesAndGraphqlWithBrowserSdkForEachTest({ mockIpfs: false });

    it('should get function by its id', async (context) => {
      const response = await context.sdks.josh({
        callback: () => window.sdk.functions().get({ name: window.seeds.fleekFunctions.fleekFunction.electronicCoEshop.name }),
      });

      expect(response).toMatchInlineSnapshot();
    });

    it('should list functions', async (context) => {
      const response = await context.sdks.josh({
        callback: () => window.sdk.functions().list(),
      });

      expect(response).toMatchInlineSnapshot();
    });

    it('should create function', async (context) => {
      const response = await context.sdks.josh({
        callback: () => window.sdk.functions().create({ name: 'new-function' }),
      });

      expect(response).toMatchInlineSnapshot({ id: expect.any(String) });
    });

    it('should delete function', async (context) => {
      const response = await context.sdks.josh({
        callback: () => window.sdk.functions().delete({ id: window.seeds.fleekFunctions.fleekFunction.electronicCoVideos.id }),
      });

      expect(response).toMatchInlineSnapshot();
    });
  });
});
