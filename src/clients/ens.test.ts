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

  it('should get ENS record by id', async () => {
    const response = await sdk.ens().get({
      id: state.ipns.ensRecord['ens.eth'].id,
    });

    expect(response).toMatchInlineSnapshot(`
      Object {
        "createdAt": "2023-03-24T08:05:13.641Z",
        "id": "af470cc1-08d8-4d39-be6f-b0eebc0a6480",
        "ipnsRecord": Object {
          "hash": "QmW73w6jvat7zDpFkYHft8eB88LiU6fPyV9LUX9et7XRUy",
          "id": "clgkj9pfa000308meh73d8nff",
          "name": "k51qzi5uqu5dipwqop5kj5na30qlwqbyyn54g8y3jcm3sdc02t9tjlec2a46ci",
        },
        "name": "ens.eth",
        "site": Object {
          "id": "clgove94b000208mlhq685zgh",
        },
        "status": "ACTIVE",
        "updatedAt": "2023-03-24T08:05:13.641Z",
      }
    `);
  });

  it('should get ENS record by name', async () => {
    const response = await sdk.ens().getByName({
      name: state.ipns.ensRecord['ens.eth'].name,
    });

    expect(response).toMatchInlineSnapshot(`
      Object {
        "createdAt": "2023-03-24T08:05:13.641Z",
        "id": "af470cc1-08d8-4d39-be6f-b0eebc0a6480",
        "ipnsRecord": Object {
          "hash": "QmW73w6jvat7zDpFkYHft8eB88LiU6fPyV9LUX9et7XRUy",
          "id": "clgkj9pfa000308meh73d8nff",
          "name": "k51qzi5uqu5dipwqop5kj5na30qlwqbyyn54g8y3jcm3sdc02t9tjlec2a46ci",
        },
        "name": "ens.eth",
        "site": Object {
          "id": "clgove94b000208mlhq685zgh",
        },
        "status": "ACTIVE",
        "updatedAt": "2023-03-24T08:05:13.641Z",
      }
    `);
  });
});
