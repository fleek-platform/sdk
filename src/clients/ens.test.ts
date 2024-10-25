import { describe, expect, it, afterAll, afterEach, beforeAll } from 'vitest';
import { server } from '../mocks/graphql/node';
import { mockGraphqlServiceApiUrl as graphqlServiceApiUrl } from '../mocks/graphql/handlers';
import { FleekSdk } from '../FleekSdk';
import state from '../mocks/state';

describe('ENS', () => {
  const sdk = new FleekSdk({
    graphqlServiceApiUrl,
    accessTokenService: {} as any,
  });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should create ENS record', async () => {
    const response = await sdk.ens().create({
      name: 'test.eth',
      ipnsRecordId: state.ipns.ipnsRecord.electronicCoEshop.id,
      siteId: state.sites.site.electronicCoEshop.id,
    });

    expect(response).toMatchInlineSnapshot(
      {
        createdAt: expect.anything(),
        id: expect.any(String),
        updatedAt: expect.anything(),
      },
      `
      Object {
        "createdAt": Anything,
        "id": Any<String>,
        "ipnsRecord": Object {
          "hash": "QmcvfRw5WDutRzvRNq2matcJWW2nKWFGDbqxaaTxnWksME",
          "id": "clgkj995t000108med7gb2w4v",
          "name": "k51qzi5uqu5dhrupvn0ru1c6el43rhimh95cuiwqy0ofo8bgomvq296b49v9r7",
        },
        "name": "test.eth",
        "site": Object {
          "id": "clgma7ilu000008jzdlwhb76a",
        },
        "status": "CREATED",
        "updatedAt": Anything,
      }
    `,
    );
  });
});
