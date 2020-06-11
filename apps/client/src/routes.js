import { reverse } from "named-urls";
import slugify from "slugify";

import AddressPage from "./pages/AddressPage";
import ConclusionPage from "./pages/ConclusionPage";
// Developer homepage, not used in production
import DevHomePage from "./pages/DevHomePage";
// Main application routes
import IntroPage from "./pages/IntroPage";
import LocationPage from "./pages/LocationPage";
// System pages
import NotFoundPage from "./pages/NotFoundPage";
import QuestionsPage from "./pages/QuestionsPage";
import ResultsPage from "./pages/ResultsPage";

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
    component: process.env.NODE_ENV !== "production" && DevHomePage,
  },
  {
    exact: true,
    path: "/test",
    component: DevHomePage,
  },
  {
    name: "intro",
    exact: true,
    path: "/:slug",
    component: IntroPage,
  },
  {
    name: "location",
    path: "/:slug/locatie",
    component: LocationPage,
  },
  {
    name: "address",
    path: "/:slug/adresgegevens",
    component: AddressPage,
    matomoPage: "location-results",
  },
  {
    name: "questions",
    path: "/:slug/vragen/:question?",
    component: QuestionsPage,
  },
  {
    name: "results",
    path: "/:slug/uitkomsten",
    component: ResultsPage,
  },
  {
    name: "conclusion",
    path: "/:slug/conclusie",
    component: ConclusionPage,
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

export const autofillRoutes = {
  address: routes.location,
  // map: ...
};
