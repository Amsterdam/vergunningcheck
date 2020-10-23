import { reverse } from "named-urls";
import React from "react";
import { RouteProps } from "react-router-dom";
import slugify from "slugify";

type RedirectRule = {
  from: string;
  to: string;
};

export const getslug = (text: string) =>
  slugify(text, {
    strict: true, // remove special chars
    lower: true, // result in lower case
  });

export const geturl = (route: string, params: { slug: string }) => {
  if (!route) {
    throw new Error(`route does not exist (geturl): '${route}'`);
  }
  return reverse(route, params);
};

type RoutePropExtended = RouteProps & { name: string };

const baseRouteConfig: RoutePropExtended[] = [
  {
    component:
      process.env.NODE_ENV !== "production"
        ? React.lazy(() => import(`./pages/DevHomePage`))
        : undefined,
    exact: true,
    name: "home",
    path: "/",
  },
  {
    component: React.lazy(() => import(`./pages/DevHomePage`)),
    exact: true,
    path: "/test",
    name: "test",
  },
  {
    component: React.lazy(
      () => import(/* webpackPrefetch: true */ `./pages/IntroPage`)
    ),
    name: "intro",
    exact: true,
    path: "/:slug",
  },
  {
    component: React.lazy(
      () => import(/* webpackPrefetch: true */ `./pages/CheckerPage`)
    ),
    exact: true,
    name: "checker",
    path: "/:slug/vragen-en-conclusie",
  },
  {
    component: React.lazy(
      () => import(/* webpackPrefetch: true */ `./pages/olo/OloLocationInput`)
    ),
    exact: true,
    name: "oloLocationInput",
    path: "/:slug/locatie",
  },
  {
    component: React.lazy(
      () => import(/* webpackPrefetch: true */ `./pages/olo/OloLocationResult`)
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

export const routeConfig: RouteProps[] = baseRouteConfig.map((baseRoute) => {
  const { name, ...rest } = baseRoute;
  return rest;
});

export const redirectConfig: RedirectRule[] = [
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
  baseRouteConfig.map(({ name, path }) => [name, path as string])
);

export const autofillRoutes: { checker: [string] } = {
  checker: [routes.checker],
};
