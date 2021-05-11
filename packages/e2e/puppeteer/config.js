export const selectors = require("../selectors");
export const host = require("../host");

// @TODO: fix based on `CI`
export const DEBUG = false;

export const puppeteerOptions = DEBUG
  ? {
      headless: false,
      slowMo: 150,
    }
  : {};

export const flows = [
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
