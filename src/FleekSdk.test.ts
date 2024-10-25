import { describe, expect, it, afterAll, afterEach, beforeAll } from 'vitest';
import { server } from './mocks/graphql/node';
import { mockGraphqlServiceApiUrl as graphqlServiceApiUrl } from './mocks/graphql/handlers';
import { FleekSdk } from './FleekSdk';

describe('FleekSDK', () => {
  const sdk = new FleekSdk({
    graphqlServiceApiUrl,
    accessTokenService: {} as any,
  });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should get current version info', async () => {
    const response = await sdk.getVersion();

    expect(response).toMatchInlineSnapshot(`
      Object {
        "version": Object {
          "__typename": "Version",
          "commitHash": "0fabad88415cedb2c3c21548afa14a949a088954",
        },
      }
    `);
  });
});
