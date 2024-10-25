import {
  describe,
  expect,
  it,
  vi,
  afterAll,
  afterEach,
  beforeAll,
} from 'vitest';
import { server } from '../mocks/graphql/node';
import { mockGraphqlServiceApiUrl as graphqlServiceApiUrl } from '../mocks/graphql/handlers';
import { FleekSdk } from '../FleekSdk';
import state from '../mocks/state';

vi.mock('@fleek-platform/utils-token', async (importOriginal) => {
  const original =
    await importOriginal<typeof import('@fleek-platform/utils-token')>();

  return {
    ...original,
    createApplicationClientId: vi.fn().mockReturnValue('client_testtesttest'),
  };
});

vi.mock('@fleek-platform/utils-text', () => ({
  generateSlug: vi.fn().mockReturnValue('crooked-bland-jackal'),
}));

describe('FleekSDK', () => {
  const sdk = new FleekSdk({
    graphqlServiceApiUrl,
    accessTokenService: {} as any,
  });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should get function by its name', async (context) => {
    const response = await sdk.functions().get({
      name: state.fleekFunctions.fleekFunction.electronicCoEshop.name,
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
});
