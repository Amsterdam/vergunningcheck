import React from "react";
import { reverse } from "named-urls";
import slugify from "slugify";

// System pages
import NotFoundPage from "./pages/NotFoundPage";

export const getslug = (text) =>
  slugify(text, {
    remove: /[*+~,.()'"!?:@]/g, // regex to remove characters
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
    component: NotFoundPage,
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
