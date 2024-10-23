import { HttpResponse } from 'msw';
import { localhost } from '../config';

const queries = [
  localhost.query('GetVersion', () => 
    HttpResponse.json({
      data: {
        "version": {
          "__typename": "Version",
          "commitHash": "0fabad88415cedb2c3c21548afa14a949a088954"
        },
      }
    }),
  ),  
]

export const handlers = [
  ...queries,
];

