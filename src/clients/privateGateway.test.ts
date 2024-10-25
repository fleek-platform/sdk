import { describe, expect, it, afterAll, afterEach, beforeAll } from 'vitest';
import { server } from '../mocks/graphql/node';
import { mockGraphqlServiceApiUrl as graphqlServiceApiUrl } from '../mocks/graphql/handlers';
import { FleekSdk } from '../FleekSdk';
import state from '../mocks/state';

describe('PrivateGateway', () => {
  const sdk = new FleekSdk({
    graphqlServiceApiUrl,
    accessTokenService: {} as any,
  });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('get private gateway by its id', async () => {
    const response = await sdk
      .privateGateways()
      .get({ id: state.storageIpfs.privateGateways.electronicCoEshop.id });

    expect(response).toMatchInlineSnapshot(`
      Object {
        "__typename": "PrivateGateway",
        "createdAt": "2023-03-24T09:05:13.641Z",
        "id": "clhruz26u000108mbdb2zaft0",
        "name": "electronic.co eshop",
        "primaryDomain": Object {
          "__typename": "Domain",
          "id": "clmhwwted000108mnajduel68",
        },
        "project": Object {
          "__typename": "Project",
          "id": "clgkiwjd8000c08mefyco2eoo",
        },
        "slug": "blue-fox-two",
        "updatedAt": "2023-04-24T09:05:13.641Z",
        "zone": Object {
          "__typename": "Zone",
          "id": "cljfq6n2y000008lb4oy403bc",
        },
      }
    `);
  });

  it('get private gateway by its slug', async () => {
    const response = await sdk
      .privateGateways()
      .getBySlug({
        slug: state.storageIpfs.privateGateways.electronicCoEshop.slug,
      });

    expect(response).toMatchInlineSnapshot(`
      Object {
        "__typename": "PrivateGateway",
        "createdAt": "2023-03-24T09:05:13.641Z",
        "id": "clhruz26u000108mbdb2zaft0",
        "name": "electronic.co eshop",
        "primaryDomain": Object {
          "__typename": "Domain",
          "id": "clmhwwted000108mnajduel68",
        },
        "project": Object {
          "__typename": "Project",
          "id": "clgkiwjd8000c08mefyco2eoo",
        },
        "slug": "blue-fox-two",
        "updatedAt": "2023-04-24T09:05:13.641Z",
        "zone": Object {
          "__typename": "Zone",
          "id": "cljfq6n2y000008lb4oy403bc",
        },
      }
    `);
  });
});
