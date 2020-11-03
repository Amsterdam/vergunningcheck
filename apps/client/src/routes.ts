import { reverse } from "named-urls";
import React from "react";
import slugify from "slugify";

type Path = string;

export type ParamTypes = {
  slug: string;
};

type RedirectRule = {
  from: string;
  to: string;
};

type RouteType = {
  component: any;
  exact?: boolean;
  name?: string;
  path: string;
};

type AutofillRouteType = {
  [name: string]: [Path];
};

export const getslug = (text: string) =>
  slugify(text, {
    strict: true, // remove special chars
    lower: true, // result in lower case
  });

export const geturl = (route: string, params: ParamTypes) => {
  if (!route) {
    throw new Error(`route does not exist (geturl): '${route}'`);
  }
  return reverse(route, params);
};

export const routeConfig: RouteType[] = [
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
    component: React.lazy(() => import("./pages/NotFoundPage")),
    name: "notfound",
    path: "*",
  },
];

export const redirectConfig: RedirectRule[] = [
  {
    from: "/zonnepanelen-of-warmtecollectoren-plaatsen",
    to: "/zonnepanelen-of-zonneboiler-plaatsen",
  },
  { from: "/kozijnen-plaatsen-of-vervangen", to: "/kozijnen-plaatsen" },
  { from: "/:slug/locatie", to: "/:slug" },
  { from: "/:slug/adresgegevens", to: "/:slug" },
  { from: "/:slug/vragen", to: "/:slug" },
  { from: "/:slug/uitkomsten", to: "/:slug" },
  { from: "/:slug/conclusie", to: "/:slug" },
];

// build map of routes with `name` => `path`
// ie. {intro: '/:slug/inleiding', checker: ...}
export const routes: { [key: string]: Path } = Object.fromEntries(
  routeConfig.map(({ name, path }) => [name, path])
);

export const autofillRoutes: AutofillRouteType = {
  checker: [routes.checker],
};
