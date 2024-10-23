import {
  describe,
  expect,
  it,
  afterAll,
  afterEach,
  beforeAll,
} from 'vitest';
import { server } from '../mocks/graphql/node';
import { mockGraphqlServiceApiUrl as graphqlServiceApiUrl  } from '../mocks/graphql/handlers';
import { FleekSdk } from '../FleekSdk';
import state from '../mocks/state';

describe('FleekSDK', () => {
  const sdk = new FleekSdk({
    graphqlServiceApiUrl,
    accessTokenService: {} as any,
  });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should get application', async () => {
    const response = await sdk
      .applications()
      .get({
        id: state.auth.application.electronicCoMobileApp.id,
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
