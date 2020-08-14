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
  version: 2,
  outputDir: ".staging",
  host: "",
  topics: {
    "staging-dakkapel": ["KtAQGNzyyPjYe5mPc", "BTEm6sJJ6ZQEP9rJx"],
    "staging-dakraam": ["gzMTczepTCdxFnvYe", "rpqSbyPsSK29JcAm9"],
  },
});
