import { describe, expect, it, afterAll, afterEach, beforeAll } from 'vitest';
import { server } from '../mocks/graphql/node';
import { mockGraphqlServiceApiUrl as graphqlServiceApiUrl } from '../mocks/graphql/handlers';
import { FleekSdk } from '../FleekSdk';
import state from '../mocks/state';

describe('Projects', () => {
  const sdk = new FleekSdk({
    graphqlServiceApiUrl,
    accessTokenService: {} as any,
  });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should create project', async () => {
    const response = await sdk.projects().create({ name: 'new-project' });

    expect(response).toMatchInlineSnapshot(
      { createdAt: expect.anything(), id: expect.any(String) },
      `
      Object {
        "avatar": null,
        "backupStorageOnArweave": false,
        "backupStorageOnFilecoin": true,
        "createdAt": Anything,
        "id": Any<String>,
        "name": "new-project",
      }
    `,
    );
  });
});
