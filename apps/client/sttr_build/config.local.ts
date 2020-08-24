import { apis as baseApis } from "./config.ts";

const staging = {
  version: 2,
  outputDir: "sttr-staging",
  host: "https://sttr-builder-staging.eu.meteorapp.com/api/v2",
  topics: {
    "staging-dakkapel": ["KtAQGNzyyPjYe5mPc", "BTEm6sJJ6ZQEP9rJx"],
    "staging-dakraam": ["gzMTczepTCdxFnvYe", "rpqSbyPsSK29JcAm9"],
  },
};

// XXX fail when duplicate keys

// export const apis = baseApis;
// export const apis = [staging];
export const apis = baseApis.concat(staging);
