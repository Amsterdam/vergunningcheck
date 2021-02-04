const yn = require("yn");

const PROD = process.env.NODE_ENV === "production";

const defaultQuery = `
  query findAddress {
    trees {
      id
      meta {
        monument
      }
      geo {
        type
        features {
          type
          geometry {
            type
            coordinates
          }
          properties {
            id
          }
        }
      }
    }

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
  }
`;

module.exports = {
  port: process.env.PORT || 4000,
  path: "graphql",
  healthPath: "health",
  graphql: {
    graphiql: PROD ? false : { defaultQuery },
    depthLimit: 4,
  },
  enableContentSecurityPolicy: PROD,
  cache: {
    dataLoader: {
      enabled: true,
    },
    dnsCacheEnabled: true,
    mocked: yn(process.env.MOCK_REDIS, { default: !PROD }),
    redisUrl: process.env.REDIS_URL,
    requestCacheEnabled: true,
  },
  resources: {
    amsterdam: {
      database: {
        enabled: yn(process.env.DATAPUNT_DB_ENABLED, { default: PROD }),
        connection: {
          database: process.env.DATAPUNT_DB_DATABASE_NAME,
          host: process.env.DATAPUNT_DB_HOST,
          password: process.env.DATAPUNT_DB_SECRET,
          user: "vergunningchecker",
          // TODO: enable SSL again, maybe use rejectUnauthorized: PROD
          //   (for insecure dev-envs).
          // ssl: {
          //   rejectUnauthorized: PROD,
          // },
        },
      },
      api: {
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
          url:
            "/v1/beschermdestadsdorpsgezichten/beschermdestadsdorpsgezichten/",
        },
        geoSearch: {
          url: "/geosearch/",
        },
        monument: {
          url: "/monumenten/",
        },
      },
    },
    national: {
      zoningPlan: {
        url:
          "https://afnemers.ruimtelijkeplannen.nl/afnemers/services?REQUEST=GetFeature&service=WFS&version=1.0.0&typename=ProvinciaalPlangebied",
        cacheTimeout: 600,
      },
    },
  },
};
