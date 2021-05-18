module.exports = {
  port: process.env.PORT || 4000,
  path: "graphql",
  healthPath: "health",
  graphql: { graphiql: false },
  enableContentSecurityPolicy: true,
  cache: {
    dataLoaderEnabled: true,
    requestCacheEnabled: true,
    dnsCacheEnabled: true,
    redis: process.env.DISABLE_REDIS !== "1" && {
      url: process.env.REDIS_URL,
    },
  },
  loaders: {
    floLegal: {
      HOST: "https://sttr-builder.eu.meteorapp.com/",
      API_KEY: escape(process.env.STTR_BUILDER_API_KEY),
      CACHE_TIMEOUT: 600,
      imtr: {
        url: "api/v2",
      },
    },
    ois: {
      HOST: "https://vergunningcheck.amsterdam.nl",
      manager: {
        url: "/api/",
      },
    },
    datapunt: {
      HOST: "https://api.data.amsterdam.nl",
      CACHE_TIMEOUT: 600,

      bag: {
        url: "/bag/v1.1/",
        cacheTimeout: 600,
      },
      bagSearch: {
        url: "/atlas/",
      },
      geoSearch: {
        url: "/geosearch/",
      },
      monument: {
        url: "/monumenten/",
      },
      cityScape: {
        url: "/v1/beschermdestadsdorpsgezichten/beschermdestadsdorpsgezichten/",
      },
    },
    zoningPlan: {
      url:
        "https://afnemers.ruimtelijkeplannen.nl/afnemers/services?REQUEST=GetFeature&service=WFS&version=1.0.0&typename=ProvinciaalPlangebied",
      cacheTimeout: 600,
    },
  },
};
