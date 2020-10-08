import { Flow } from "./types";

// export const host = "https://vergunningcheck.amsterdam.nl/test";
// export const host = "https://ux.chappie2.com";
export const host = "http://localhost:3000";

export const DEBUG = false;

export const puppeteerOptions = DEBUG ? {
  headless: false, slowMo: 150
} : {};

export const address = {
  zipCode: '1043ap',
  houseNumberFull: '30',
}

export const flows: Flow[] = [
  {
    type: 'olo',
    options: {
      shouldAlwaysDisplayMonumentStatus: true,
    },
    checkers: ["aanbouw-of-uitbouw-maken", "bouwwerk-slopen", "intern-verbouwen"],
  },
  {
    type: 'imtr',
    options: {
      shouldAlwaysDisplayMonumentStatus: false,
    },
    checkers: ["dakkapel-plaatsen", "dakraam-plaatsen", "kozijnen-plaatsen", "zonnepanelen-of-zonneboiler-plaatsen", "zonwering-of-rolluik-plaatsen"],
  }
];
