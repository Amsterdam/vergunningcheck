/**
 * NOTE: This file is not used!
 *
 * Use a copy this config file for local configuration during development
 * if you want. Include the host of the api you are using.
 *
 * `$ cp config.local.dist.ts config.local.ts`
 *
 */

import { apis as baseApis } from "./config.ts";

export const apis = baseApis.concat({
  host: "the domain of the api",
  outputDir: ".staging", // make sure to start with a dot (.) so it's ignored by .gitignore
  topics: {
    "staging-dakkapel": ["KtAQGNzyyPjYe5mPc", "BTEm6sJJ6ZQEP9rJx"],
    "staging-dakraam": ["gzMTczepTCdxFnvYe", "rpqSbyPsSK29JcAm9"],
  },
});
