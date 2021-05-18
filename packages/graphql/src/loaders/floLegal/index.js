const path = require("path");
const fs = require("fs");
const debug = require("debug")("graphql:loader:flolegal");
const parser = require("fast-xml-parser");
const fetch = require("node-fetch");

const { promisify } = require("util");
const { withCache } = require("../../util");
const readFile = promisify(fs.readFile);

const {
  API_KEY,
  CACHE_TIMEOUT,
  HOST,
  LOCAL_IMTR_DIR,
  imtr: config,
} = require("../../../config").loaders.floLegal;

const TTL = config.cacheTimeout || CACHE_TIMEOUT;
const URL = `${HOST}${config.url}`;

if (!API_KEY) {
  throw new Error(`STTR_BUILDER_API_KEY not found in env`);
}

const loader = {
  fetch: async (id) => {
    const url = `${URL}/conclusie/sttr`;
    const options = {
      method: "POST",
      body: `activiteitId=${id}`,
      headers: {
        "x-api-key": API_KEY,
        "content-type": "application/x-www-form-urlencoded",
      },
    };
    debug(`fetch check with id ${id}: ${url}`, options);

    let result;
    if (LOCAL_IMTR_DIR) {
      result = await readFile(path.join(LOCAL_IMTR_DIR, `${id}.json`), "utf8");
    } else {
      const request = await fetch(url, options);
      // XXX: request.status === "ok" check
      result = await request.text();
    }

    const { sttr, version } = JSON.parse(result);

    if (typeof version !== "number") {
      throw new Error("version should be a number");
    }

    const json = await parser.parse(sttr, {
      ignoreAttributes: false,
      arrayMode: true,
      attrNodeName: "attributes",
      attributeNamePrefix: "",
    });

    return {
      json,
      version,
    };
  },

  cached: (id) => withCache(`floLegal:imtr:${id}`, () => loader.fetch(id), TTL),
  load: async (ids) => ids.map(loader.cached),
};

module.exports = loader;
