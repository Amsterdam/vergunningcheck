/**
 * WARNING: this file is shared across all development environments
 * including all developers.
 * If you want to make changes for your env only create a `local.js`
 * file in this directory.
 */
const merge = require("lodash/merge");
const base = require("./default");

const config = {
  cache: {
    redis: false,
  },
  enableContentSecurityPolicy: false,
  loaders: {
    ois: {
      HOST: "http://127.0.0.1:8000",
      manager: {
        mock: true,
      },
    },
    datapunt: {
      // HOST: "https:// .... use acceptance url if needed
      CACHE_TIMEOUT: 10,
    },
  },
  graphql: {
    graphiql: {
      defaultQuery: `
      query findAddress {
        findAddress(postalCode: "1055xd", houseNumberFull: "19c") {
          exactMatch {
            ... on Address {
              streetName
              postalCode
              houseNumber
              houseNumberFull
              residence
            }
            restrictions {
              __typename
              ... on CityScape {
                name
                __typename
              }
              ... on Monument {
                name
                __typename
              }
            }
            zoningPlans {
              name
              __typename
            }
            __typename
          }
          matches {
            ... on Address {
              streetName
              postalCode
              houseNumber
              houseNumberFull
              residence
            }
            __typename
          }
          __typename
        }
      }`,
    },
  },
};

module.exports = merge(base, config);
