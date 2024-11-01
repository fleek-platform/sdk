import type {
  Deployment,
  Domain,
  FilecoinDeal,
  Pin,
  PrivateGateway,
  Site,
} from '@fleek-platform/utils-genql-client';

type ResponseWithTypename = {
  __typename?: string;
};

type Categories =
  | 'Deployment'
  | 'PrivateGateway'
  | 'Domain'
  | 'Pin'
  | 'Site'
  | 'FilecoinDeal';

type Required = {
  [key in Categories]: {
    keys: string[];
    typename: string;
  };
};

const requiredByCategory: Required = {
  Deployment: {
    keys: ['cid', 'siteId'],
    typename: 'Deployment',
  },
  PrivateGateway: {
    keys: ['primaryDomain', 'slug'],
    typename: 'PrivateGateway',
  },
  Domain: {
    keys: ['id', 'hostname'],
    typename: 'Domain',
  },
  Site: {
    keys: ['id', 'slug'],
    typename: 'Site',
  },
  Pin: {
    keys: ['cid', 'filename'],
    typename: 'Pin',
  },
  FilecoinDeal: {
    keys: ['cid', 'dealId'],
    typename: 'FilecoinDeal',
  },
};

// eslint-disable-next-line fleek-custom/valid-argument-types
export const isDeploymentResponseQuery = (
  response: ResponseWithTypename,
): response is Deployment =>
  isQueryTypename({
    obj: response,
    typename: 'Deployment',
  });

// eslint-disable-next-line fleek-custom/valid-argument-types
export const isPrivateGatewayResponseQuery = (
  response: ResponseWithTypename,
): response is PrivateGateway =>
  isQueryTypename({
    obj: response,
    typename: 'PrivateGateway',
  });

// eslint-disable-next-line fleek-custom/valid-argument-types
export const isPrivateGatewaysResponseQuery = (
  response: ResponseWithTypename[],
): response is PrivateGateway[] =>
  response.every((obj) =>
    isQueryTypename({
      obj,
      typename: 'PrivateGateway',
    }),
  );

// eslint-disable-next-line fleek-custom/valid-argument-types
export const isDomainResponseQuery = (
  response: ResponseWithTypename,
): response is Domain =>
  isQueryTypename({
    obj: response,
    typename: 'Domain',
  });

// eslint-disable-next-line fleek-custom/valid-argument-types
export const isDomainsResponseQuery = (
  response: ResponseWithTypename[],
): response is Domain[] =>
  response.every((obj) =>
    isQueryTypename({
      obj,
      typename: 'Domain',
    }),
  );

// eslint-disable-next-line fleek-custom/valid-argument-types
export const isSiteResponseQuery = (
  response: ResponseWithTypename,
): response is Site =>
  isQueryTypename({
    obj: response,
    typename: 'Site',
  });

// eslint-disable-next-line fleek-custom/valid-argument-types
export const isSitesResponseQuery = (
  response: ResponseWithTypename[],
): response is Site[] =>
  response.every((obj) =>
    isQueryTypename({
      obj,
      typename: 'Site',
    }),
  );

// eslint-disable-next-line fleek-custom/valid-argument-types
export const isPinResponseQuery = (
  response: ResponseWithTypename,
): response is Pin =>
  isQueryTypename({
    obj: response,
    typename: 'Pin',
  });

// eslint-disable-next-line fleek-custom/valid-argument-types
export const isPinsResponseQuery = (
  response: ResponseWithTypename[],
): response is Pin[] =>
  response.every((obj) =>
    isQueryTypename({
      obj,
      typename: 'Pin',
    }),
  );

// eslint-disable-next-line fleek-custom/valid-argument-types
export const isFilecoinDealResponseQuery = (
  response: ResponseWithTypename,
): response is FilecoinDeal =>
  isQueryTypename({
    obj: response,
    typename: 'FilecoinDeal',
  });

// eslint-disable-next-line fleek-custom/valid-argument-types
export const isFilecoinDealsResponseQuery = (
  response: ResponseWithTypename[],
): response is FilecoinDeal[] =>
  response.every((obj) =>
    isQueryTypename({
      obj,
      typename: 'FilecoinDeal',
    }),
  );

const isQueryTypename = ({
  obj,
  typename,
}: { obj: { __typename?: string } | null; typename: Categories }): boolean => {
  if (!obj) {
    return false;
  }

  return (
    obj.__typename === requiredByCategory?.[typename].typename &&
    requiredByCategory?.[typename].keys.every((key) => key in obj)
  );
};
