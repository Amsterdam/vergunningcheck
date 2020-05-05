import { reverse } from "named-urls";
import slugify from "slugify";

// Main application routes
import IntroPage from "./pages/IntroPage";
import LocationPage from "./pages/LocationPage";
import AddressPage from "./pages/AddressPage";
import QuestionsPage from "./pages/QuestionsPage";
import ConclusionPage from "./pages/ConclusionPage";
import ResultsPage from "./pages/ResultsPage";

// System pages
import NotFoundPage from "./pages/NotFoundPage";
// Developer homepage, not used in production
import DevHomePage from "./pages/DevHomePage";

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
    component: process.env.NODE_ENV !== "production" && DevHomePage,
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

// build map of routes with `name` => `path`
// ie. {intro: '/:slug/inleiding'}
export const routes = Object.fromEntries(
  routeConfig.map(({ name, path }) => [name, path])
);
