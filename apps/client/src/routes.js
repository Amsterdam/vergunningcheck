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
    name: "checker",
    path: "/:slug/checker",
    component: React.lazy(() =>
      import(/* webpackPrefetch: true */ `./pages/CheckerPage`)
    ),
  },
  {
    name: "intro",
    // exact: true,
    path: "/:slug",
    component: React.lazy(() =>
      import(/* webpackPrefetch: true */ `./pages/IntroPage`)
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
  checker: [routes.checker],
};
