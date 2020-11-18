import { reverse } from "named-urls";
import React from "react";
import { RouteProps } from "react-router-dom";
import slugify from "slugify";

import { topics } from "./config";
import topicsJson from "./topics.json";

type RedirectRule = {
  from: string;
  to: string;
};

export const getslug = (text: string) =>
  slugify(text, {
    strict: true, // remove special chars
    lower: true, // result in lower case
  });

export const geturl = (route: string, params?: { slug: string }) => {
  if (!route) {
    throw new Error(`route does not exist (geturl): '${route}'`);
  }
  return reverse(route, params);
};

type RoutePropExtended = RouteProps & { name: string };

export const imtrSlugs = topicsJson
  .flatMap((api) => api.map((t) => t.slug))
  .join("|");

export const oloSlugs = topics
  .filter(({ redirectToOlo, hasIMTR }) => !redirectToOlo && !hasIMTR)
  .map((t) => t.slug)
  .join("|");

export const oloRedirectSlugs = topics
  .filter(({ redirectToOlo }) => redirectToOlo)
  .map((t) => t.slug)
  .join("|");

const baseRouteConfig: RoutePropExtended[] = [
  {
    component:
      process.env.NODE_ENV !== "production"
        ? React.lazy(() => import(`./pages/HomePage`))
        : undefined,
    exact: true,
    name: "home",
    path: "/",
  },
  {
    component: React.lazy(() => import(`./pages/HomePage`)),
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
    path: `/:slug(${imtrSlugs})`,
  },
  {
    component: React.lazy(
      () => import(/* webpackPrefetch: true */ `./pages/CheckerPage`)
    ),
    exact: true,
    name: "checker",
    path: `/:slug(${imtrSlugs})/vragen-en-uitkomst`,
  },
  {
    component: React.lazy(
      () => import(/* webpackPrefetch: true */ `./pages/olo/OloLocationInput`)
    ),
    exact: true,
    name: "oloLocationInput",
    path: `/:slug(${oloSlugs})`,
  },
  {
    component: React.lazy(
      () => import(/* webpackPrefetch: true */ `./pages/olo/OloLocationResult`)
    ),
    exact: true,
    name: "oloLocationResult",
    path: `/:slug(${oloSlugs})/adresgegevens`,
  },
  {
    component: React.lazy(
      () => import(/* webpackPrefetch: true */ `./pages/olo/OloRedirectPage`)
    ),
    exact: true,
    name: "oloRedirect",
    path: `/:slug(${oloRedirectSlugs})`,
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
