import { describe, expect, it, afterAll, afterEach, beforeAll } from 'vitest';
import { server } from '../mocks/graphql/node';
import { mockGraphqlServiceApiUrl as graphqlServiceApiUrl } from '../mocks/graphql/handlers';
import { FleekSdk } from '../FleekSdk';
import state from '../mocks/state';

describe('Sites', () => {
  const sdk = new FleekSdk({
    graphqlServiceApiUrl,
    accessTokenService: {} as any,
  });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should get site by its id', async (context) => {
    const response = await sdk
      .sites()
      .get({ id: state.sites.site.electronicCoEshop.id });

    expect(response).toMatchInlineSnapshot(`
      Object {
        "deployments": Array [
          Object {
            "__typename": "Deployment",
            "cid": "bafybeibtme5hmkjxsryerf6pihhfbhifwnsz7gmhnfqglg2r326m4glzva",
            "createdAt": "2023-03-24T10:05:13.641Z",
            "id": "clgmajwf7000208mo67lnhgu0",
            "siteId": "clgma7ilu000008jzdlwhb76a",
            "status": "BUILD_IN_PROGRESS",
            "storageType": "IPFS",
            "updatedAt": "2023-03-24T10:06:13.641Z",
          },
          Object {
            "__typename": "Deployment",
            "cid": "bafybeifyvm5aa2z35jnpehvg3hfflazesjfma53yekmhz7dckqn4buvr7q",
            "createdAt": "2023-03-24T09:05:13.641Z",
            "id": "clgmajsoo000108moef7f1yt0",
            "siteId": "clgma7ilu000008jzdlwhb76a",
            "status": "RELEASE_COMPLETED",
            "storageType": "IPFS",
            "updatedAt": "2023-03-24T09:08:13.641Z",
          },
          Object {
            "__typename": "Deployment",
            "cid": "bafybeibtme5hmkjxsryerf6pihhfbhifwnsz7gmhnfqglg2r326m4glaaa",
            "createdAt": "2023-03-23T10:05:13.641Z",
            "id": "clgmajwf7000208mo67lnh000",
            "siteId": "clgma7ilu000008jzdlwhb76a",
            "status": "RELEASE_COMPLETED",
            "storageType": "IPFS",
            "updatedAt": "2023-03-23T10:05:13.641Z",
          },
        ],
        "domains": Array [
          Object {
            "__typename": "Domain",
            "hostname": "electronic.co",
            "id": "clgmfj1pa000108lc0g5i7d32",
          },
          Object {
            "__typename": "Domain",
            "hostname": "eshop-electronic.co",
            "id": "clgmfj874000208lc2e9ccglf",
          },
          Object {
            "__typename": "Domain",
            "hostname": "static.eshop-electronic.co",
            "id": "clmhwwted000108mnajduel68",
          },
        ],
        "id": "clgma7ilu000008jzdlwhb76a",
        "ipnsRecords": Array [
          Object {
            "__typename": "IpnsRecord",
            "id": "clgkj995t000108med7gb2w4v",
          },
        ],
        "name": "electronic-co-shop",
        "slug": "blue-green-yellow",
        "zones": Array [
          Object {
            "__typename": "SiteZone",
            "id": "clgmfj874000208lc2e9ccglf",
            "status": "CREATED",
          },
          Object {
            "__typename": "SiteZone",
            "id": "cljfq6n2y000008lb4oy403bc",
            "status": "CREATED",
          },
        ],
      }
    `);
  });

  it('should get site by its slug', async () => {
    const response = await sdk
      .sites()
      .getBySlug({ slug: state.sites.site.electronicCoEshop.slug });

    expect(response).toMatchInlineSnapshot(`
      Object {
        "deployments": Array [
          Object {
            "__typename": "Deployment",
            "cid": "bafybeibtme5hmkjxsryerf6pihhfbhifwnsz7gmhnfqglg2r326m4glzva",
            "createdAt": "2023-03-24T10:05:13.641Z",
            "id": "clgmajwf7000208mo67lnhgu0",
            "siteId": "clgma7ilu000008jzdlwhb76a",
            "status": "BUILD_IN_PROGRESS",
            "storageType": "IPFS",
            "updatedAt": "2023-03-24T10:06:13.641Z",
          },
          Object {
            "__typename": "Deployment",
            "cid": "bafybeifyvm5aa2z35jnpehvg3hfflazesjfma53yekmhz7dckqn4buvr7q",
            "createdAt": "2023-03-24T09:05:13.641Z",
            "id": "clgmajsoo000108moef7f1yt0",
            "siteId": "clgma7ilu000008jzdlwhb76a",
            "status": "RELEASE_COMPLETED",
            "storageType": "IPFS",
            "updatedAt": "2023-03-24T09:08:13.641Z",
          },
          Object {
            "__typename": "Deployment",
            "cid": "bafybeibtme5hmkjxsryerf6pihhfbhifwnsz7gmhnfqglg2r326m4glaaa",
            "createdAt": "2023-03-23T10:05:13.641Z",
            "id": "clgmajwf7000208mo67lnh000",
            "siteId": "clgma7ilu000008jzdlwhb76a",
            "status": "RELEASE_COMPLETED",
            "storageType": "IPFS",
            "updatedAt": "2023-03-23T10:05:13.641Z",
          },
        ],
        "domains": Array [
          Object {
            "__typename": "Domain",
            "hostname": "electronic.co",
            "id": "clgmfj1pa000108lc0g5i7d32",
          },
          Object {
            "__typename": "Domain",
            "hostname": "eshop-electronic.co",
            "id": "clgmfj874000208lc2e9ccglf",
          },
          Object {
            "__typename": "Domain",
            "hostname": "static.eshop-electronic.co",
            "id": "clmhwwted000108mnajduel68",
          },
        ],
        "id": "clgma7ilu000008jzdlwhb76a",
        "ipnsRecords": Array [
          Object {
            "__typename": "IpnsRecord",
            "id": "clgkj995t000108med7gb2w4v",
          },
        ],
        "name": "electronic-co-shop",
        "slug": "blue-green-yellow",
        "zones": Array [
          Object {
            "__typename": "SiteZone",
            "id": "clgmfj874000208lc2e9ccglf",
            "status": "CREATED",
          },
          Object {
            "__typename": "SiteZone",
            "id": "cljfq6n2y000008lb4oy403bc",
            "status": "CREATED",
          },
        ],
      }
    `);
  });
});
