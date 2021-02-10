import { reverse } from "named-urls";
import { lazy } from "react";
import { RouteProps } from "react-router-dom";
import slugify from "slugify";

import { topics } from "./config";
import apiTopics from "./topics.json";
import { TopicType } from "./types";

type RedirectRule = {
  from: string;
  to: string;
};

type RoutePropExtended = RouteProps & { name: string };

// Find all topics by their type
const findAllTopicsByType = (type: TopicType) =>
  topics.filter((t) => t.type === type);

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

export const apiTopicSlugs = apiTopics.flatMap((apiTopic) =>
  apiTopic.map(({ slug }) => slug)
);

export const imtrSlugs = apiTopicSlugs.join("|");

// Get all OLO permit checks by fetching all `PERMIT_CHECK` and filter to see if they have an actual api topic file
export const oloSlugs = findAllTopicsByType(TopicType.PERMIT_CHECK)
  .filter((t) => !apiTopicSlugs.find((apiSlug) => apiSlug === t.slug))
  .map((t) => t.slug)
  .join("|");

export const oloRedirectSlugs = findAllTopicsByType(TopicType.REDIRECT)
  .map((t) => t.slug)
  .join("|");

const baseRouteConfig: RoutePropExtended[] = [
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
    name: "intro",
    exact: true,
    path: `/:slug(${imtrSlugs})`,
  },
  {
    component: lazy(
      () => import(/* webpackPrefetch: true */ `./pages/CheckerPage`)
    ),
    exact: true,
    name: "checker",
    path: `/:slug(${imtrSlugs})/vragen-en-uitkomst`,
  },
  {
    component: lazy(
      () => import(/* webpackPrefetch: true */ `./pages/olo/OloLocationInput`)
    ),
    exact: true,
    name: "oloLocationInput",
    path: `/:slug(${oloSlugs})`,
  },
  {
    component: lazy(
      () => import(/* webpackPrefetch: true */ `./pages/olo/OloLocationResult`)
    ),
    exact: true,
    name: "oloLocationResult",
    path: `/:slug(${oloSlugs})/adresgegevens`,
  },
  {
    component: lazy(
      () => import(/* webpackPrefetch: true */ `./pages/olo/OloRedirectPage`)
    ),
    exact: true,
    name: "oloRedirect",
    path: `/:slug(${oloRedirectSlugs})`,
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

export const autofillRoutes: { checker: [string] } = {
  checker: [routes.checker],
};
