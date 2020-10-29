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
    component:
      process.env.NODE_ENV !== "production" &&
      React.lazy(() => import(`./pages/DevHomePage`)),
    exact: true,
    name: "home",
    path: "/",
  },
  {
    component: React.lazy(() => import(`./pages/DevHomePage`)),
    exact: true,
    path: "/test",
  },
  {
    component: React.lazy(() =>
      import(/* webpackPrefetch: true */ `./pages/IntroPage`)
    ),
    name: "intro",
    exact: true,
    path: "/:slug",
  },
  {
    component: React.lazy(() =>
      import(/* webpackPrefetch: true */ `./pages/CheckerPage`)
    ),
    exact: true,
    name: "checker",
    path: "/:slug/vragen-en-uitkomst",
  },
  {
    component: React.lazy(() =>
      import(/* webpackPrefetch: true */ `./pages/olo/OloLocationInput`)
    ),
    exact: true,
    name: "oloLocationInput",
    path: "/:slug/locatie",
  },
  {
    component: React.lazy(() =>
      import(/* webpackPrefetch: true */ `./pages/olo/OloLocationResult`)
    ),
    exact: true,
    name: "oloLocationResult",
    path: "/:slug/adresgegevens",
  },
  {
    component: React.lazy(() => import("./pages/NotFoundPage")),
    name: "notfound",
    path: "*",
  },
];

export const redirectConfig = [
  {
    from: "/zonnepanelen-of-warmtecollectoren-plaatsen",
    to: "/zonnepanelen-of-zonneboiler-plaatsen",
  },
  { from: "/kozijnen-plaatsen-of-vervangen", to: "/kozijnen-plaatsen" },
  { from: "/:slug/vragen", to: "/:slug" },
  { from: "/:slug/uitkomsten", to: "/:slug" },
  { from: "/:slug/conclusie", to: "/:slug" },
];

// build map of routes with `name` => `path`
// ie. {intro: '/:slug/inleiding'}
export const routes = Object.fromEntries(
  routeConfig.map(({ name, path }) => [name, path])
);

export const autofillRoutes = {
  checker: [routes.checker],
};
