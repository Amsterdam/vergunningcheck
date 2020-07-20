import { reverse } from "named-urls";
import React from "react";
import slugify from "slugify";

export const getslug = (text) =>
  slugify(text, {
    strict: true, // remove special chars
    lower: true, // result in lower case
  });

export const geturl = (route, params) => {
  if (!route) {
    throw new Error(`route does not exist (geturl): '${route}'`);
  }
  return reverse(route, params);
};

export const routeConfig = [
  {
    name: "home",
    exact: true,
    path: "/",
    component:
      process.env.NODE_ENV !== "production" &&
      React.lazy(() => import(`./pages/DevHomePage`)),
  },
  {
    exact: true,
    path: "/test",
    component: React.lazy(() => import(`./pages/DevHomePage`)),
  },
  {
    exact: true,
    name: "stepper",
    path: "/:slug/stepper",
    component: React.lazy(() =>
      import(/* webpackPrefetch: true */ `./pages/StepperPage`)
    ),
  },
  {
    exact: true,
    name: "wrapper",
    path: "/:slug/wrapper",
    component: React.lazy(() =>
      import(/* webpackPrefetch: true */ `./pages/WrapperPage`)
    ),
  },
  {
    name: "intro",
    exact: true,
    path: "/:slug",
    component: React.lazy(() =>
      import(/* webpackPrefetch: true */ `./pages/IntroPage`)
    ),
  },
  {
    name: "location",
    path: "/:slug/locatie",
    component: React.lazy(() =>
      import(/* webpackPrefetch: true */ `./pages/LocationPage`)
    ),
  },
  {
    name: "address",
    path: "/:slug/adresgegevens",
    component: React.lazy(() =>
      import(/* webpackPrefetch: true */ `./pages/AddressPage`)
    ),
    matomoPage: "location-results",
  },
  {
    name: "questions",
    path: "/:slug/vragen/:question?",
    component: React.lazy(() =>
      import(/* webpackPrefetch: true */ `./pages/QuestionsPage`)
    ),
  },
  {
    name: "results",
    path: "/:slug/uitkomsten",
    component: React.lazy(() =>
      import(/* webpackPrefetch: true */ `./pages/ResultsPage`)
    ),
  },
  {
    name: "conclusion",
    path: "/:slug/conclusie",
    component: React.lazy(() =>
      import(/* webpackPrefetch: true */ `./pages/ConclusionPage`)
    ),
  },
  {
    name: "notfound",
    path: "*",
    component: React.lazy(() => import("./pages/NotFoundPage")),
  },
];

export const redirectConfig = [
  [
    "/zonnepanelen-of-warmtecollectoren-plaatsen",
    "/zonnepanelen-of-zonneboiler-plaatsen",
  ],
];

// build map of routes with `name` => `path`
// ie. {intro: '/:slug/inleiding'}
export const routes = Object.fromEntries(
  routeConfig.map(({ name, path }) => [name, path])
);

export const autofillRoutes = {
  address: [routes.location, routes.address],
};
