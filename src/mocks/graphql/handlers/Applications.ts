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
];

export const handlers = [
  ...queries,
];

