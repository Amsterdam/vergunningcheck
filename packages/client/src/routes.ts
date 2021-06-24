import { reverse } from "named-urls";
import { lazy } from "react";
import { RouteProps } from "react-router-dom";

import { RedirectRule, RoutePropExtended } from "./types";

export const geturl = (route: string, params?: { slug: string }) => {
  if (!route) {
    throw new Error(`route does not exist (geturl): '${route}'`);
  }
  return reverse(route, params);
};

export const baseRouteConfig: RoutePropExtended[] = [
  {
    component:
      process.env.NODE_ENV !== "production"
        ? lazy(() => import(`./pages/HomePage`))
        : undefined,
    exact: true,
    name: "home",
    path: "/",
  },
  {
    component: lazy(() => import(`./pages/HomePage`)),
    exact: true,
    path: "/test",
    name: "test",
  },
  {
    component: lazy(
      () => import(/* webpackPrefetch: true */ `./pages/IntroPage`)
    ),
    name: "start",
    exact: true,
    path: `/:slug`,
  },
  {
    component: lazy(
      () => import(/* webpackPrefetch: true */ `./pages/CheckerPage`)
    ),
    exact: true,
    name: "checker",
    path: `/:slug/vragen-en-uitkomst`,
  },
  {
    component: lazy(
      () => import(/* webpackPrefetch: true */ `./pages/olo/OloLocationResult`)
    ),
    exact: true,
    name: "oloLocationResult",
    path: `/:slug/adresgegevens`,
  },
  {
    component: lazy(() => import("./pages/NotFoundPage")),
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
