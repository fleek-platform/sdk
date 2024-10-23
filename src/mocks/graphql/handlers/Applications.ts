import { graphql, HttpResponse } from 'msw';

export const mockGraphqlServiceApiUrl = 'https://fleek.mock.server/graphql';
const localhost = graphql.link(mockGraphqlServiceApiUrl);

const queries = [
  localhost.query('GetApplication', () => 
    HttpResponse.json({
      data: {
        "application": {
          "clientId": "client_SCmayempJ1d953yjn1yx",
          "createdAt": "2023-03-23T12:05:13.641Z",
          "id": "cli2ymypd000208l86gjd6p17",
          "name": "electronicCoMobileApp",
          "updatedAt": "2023-03-23T12:05:13.641Z",
          "whiteLabelDomains": [
            {
              "hostname": "app.best-electronic.co",
              "id": "clu2xf6uz000208jv6qskg1hm"
            },
            {
              "hostname": "app.electronic.co",
              "id": "clu2xd1bs000108jv0v0d2xmy"
            }
          ],
          "whitelistDomains": [
            {
              "hostname": "app.best-electronic.co",
              "id": "cli2z1zim000008l66z4l7qg3"
            },
            {
              "hostname": "app.electronic.co",
              "id": "cli2z10wq000208jw42gd4pyh"
            }
          ]
        },
      }
    }),
  ),
  localhost.query('GetApplications', () => 
    HttpResponse.json({
      data: {
        "applications": {
          "data": [
            {
              "clientId": "client_ZRacrn3b1ForrjK5u8VD",
              "createdAt": "2023-03-23T11:05:13.641Z",
              "id": "cli2ymucu000108l81grqhzcp",
              "name": "electronicCoWebApp",
              "updatedAt": "2023-03-23T11:05:13.641Z",
              "whiteLabelDomains": [],
              "whitelistDomains": [],
            },
            {
              "clientId": "client_SCmayempJ1d953yjn1yx",
              "createdAt": "2023-03-23T12:05:13.641Z",
              "id": "cli2ymypd000208l86gjd6p17",
              "name": "electronicCoMobileApp",
              "updatedAt": "2023-03-23T12:05:13.641Z",
              "whiteLabelDomains": [
                {
                  "hostname": "app.best-electronic.co",
                  "id": "clu2xf6uz000208jv6qskg1hm",
                },
                {
                  "hostname": "app.electronic.co",
                  "id": "clu2xd1bs000108jv0v0d2xmy",
                },
              ],
              "whitelistDomains": [
                {
                  "hostname": "app.best-electronic.co",
                  "id": "cli2z1zim000008l66z4l7qg3",
                },
                {
                  "hostname": "app.electronic.co",
                  "id": "cli2z10wq000208jw42gd4pyh",
                },
              ],
            }
          ]
        }
      }
    }),
  ),
];

const mutations = [
  localhost.mutation('CreateApplication', () => 
    HttpResponse.json({
      data: {
        "createApplication": {
          "__typename": "Application",
          "clientId": "client_testtesttest",
          "createdAt": "2023-03-23T12:05:13.641Z",
          "id": "",
          "name": "test-application",
          "updatedAt": "2023-03-23T12:05:13.641Z"
        }
      }
    }),
  ),
  localhost.mutation('UpdateApplication', () => 
    HttpResponse.json({
      data: {
        "updateApplication": {
          "clientId": "client_SCmayempJ1d953yjn1yx",
          "createdAt": "2023-03-23T12:05:13.641Z",
          "id": "cli2ymypd000208l86gjd6p17",
          "name": "new-mobile-app-name",
          "updatedAt": "2023-03-23T12:05:13.641Z",
          "whiteLabelDomains": [
            {
              "hostname": "app.best-electronic.co",
              "id": "clu2xf6uz000208jv6qskg1hm"
            },
            {
              "hostname": "app.electronic.co",
              "id": "clu2xd1bs000108jv0v0d2xmy"
            }
          ],
          "whitelistDomains": [
            {
              "hostname": "app.best-electronic.co",
              "id": "cli2z1zim000008l66z4l7qg3"
            },
            {
              "hostname": "app.electronic.co",
              "id": "cli2z10wq000208jw42gd4pyh"
            }
          ]
        }
      }
    }),
  ),
  localhost.mutation('DeleteApplication', () => 
    HttpResponse.json({
      data: {
        "deleteApplication": {
          "clientId": "client_SCmayempJ1d953yjn1yx",
          "createdAt": "2023-03-23T12:05:13.641Z",
          "id": "cli2ymypd000208l86gjd6p17",
          "name": "electronicCoMobileApp",
          "updatedAt": "2023-03-23T12:05:13.641Z",
          "whiteLabelDomains": [
            {
              "hostname": "app.best-electronic.co",
              "id": "clu2xf6uz000208jv6qskg1hm"
            },
            {
              "hostname": "app.electronic.co",
              "id": "clu2xd1bs000108jv0v0d2xmy"
            }
          ],
          "whitelistDomains": [
            {
              "hostname": "app.best-electronic.co",
              "id": "cli2z1zim000008l66z4l7qg3"
            },
            {
              "hostname": "app.electronic.co",
              "id": "cli2z10wq000208jw42gd4pyh"
            }
          ]
        }
      }
    }),
  ),
];

export const handlers = [
  ...queries,
  ...mutations,
];

