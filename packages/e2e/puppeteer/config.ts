import { Flow } from "./types";

// export const host = "https://vergunningcheck.amsterdam.nl/test";
// export const host = "https://ux.chappie2.com";
export const host = "http://localhost:3030";

// @TODO: fix based on `CI`
export const DEBUG = false;

export const puppeteerOptions = DEBUG
  ? {
      headless: false,
      slowMo: 150,
    }
  : {};

export const flows: Flow[] = [
  {
    type: "olo",
    options: {
      shouldAlwaysDisplayRestrictions: true,
    },
    checkers: [
      "aanbouw-of-uitbouw-maken",
      "bouwwerk-slopen",
      "intern-verbouwen",
    ],
  },
  {
    type: "imtr",
    options: {
      shouldAlwaysDisplayRestrictions: false,
    },
    checkers: [
      "dakkapel-plaatsen",
      "dakraam-plaatsen",
      "kozijnen-plaatsen",
      "zonnepanelen-of-zonneboiler-plaatsen",
      "zonwering-of-rolluik-plaatsen",
    ],
  },
];
