const yn = require("yn");

const PROD = process.env.NODE_ENV === "production";
const DEV = !PROD;

module.exports = {
  port: process.env.PORT || 4000,
  path: "graphql",
  healthPath: "health",
  graphql: {
    graphiql: DEV
      ? {
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
        }
      : false,
  },
  enableContentSecurityPolicy: PROD,
  cache: {
    dataLoaderEnabled: true,
    requestCacheEnabled: true,
    dnsCacheEnabled: true,
    enabled: yn(process.env.REDIS_ENABLED, { default: PROD }),
    redisUrl: process.env.REDIS_URL,
  },
  resources: {
    datapuntDb: {
      CACHE_TIMEOUT: 600,
      ENABLED: yn(process.env.DATAPUNT_DB_ENABLED),
      client: {
        database: "dsr_vergunningchecker_dev",
        host: "db01.acc.dsq.amsterdam.nl", // TODO replace acc db with prod, via env var?
        password: process.env.DATAPUNT_DB_SECRET,
        // port: 5432,
        user: "vergunningchecker",
      },
      tree: {
        cacheTimeout: 600,
      },
    },
    datapuntApi: {
      HOST: "https://api.data.amsterdam.nl",
      CACHE_TIMEOUT: 600,

      bag: {
        url: "/bag/v1.1/",
        cacheTimeout: 600,
      },
      bagSearch: {
        url: "/atlas/",
      },
      cityScape: {
        url: "/v1/beschermdestadsdorpsgezichten/beschermdestadsdorpsgezichten/",
      },
      geoSearch: {
        url: "/geosearch/",
      },
      monument: {
        url: "/monumenten/",
      },
    },
    zoningPlan: {
      url:
        "https://afnemers.ruimtelijkeplannen.nl/afnemers/services?REQUEST=GetFeature&service=WFS&version=1.0.0&typename=ProvinciaalPlangebied",
      cacheTimeout: 600,
    },
  },
};
