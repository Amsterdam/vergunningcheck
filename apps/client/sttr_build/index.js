/* eslint no-console: 0 */
const mkdirp = require("mkdirp");
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const batchPromises = require("batch-promises");
const sttrbuild = require("./parser");
const topics = require("./config");

const MAX_PARALLEL = 6;
const env = process.env.STTR_ENV === "production" ? "PROD" : "STAGING";
const outputDir = path.join(
  __dirname,
  "..",
  "public",
  "sttr",
  env.toLowerCase()
);
const sttrApi = `https://sttr-builder${
  env === "PROD" ? "" : "-staging"
}.eu.meteorapp.com/api/v2`;
const listUrl = `${sttrApi}/activiteiten`;
const detailUrl = `${sttrApi}/conclusie/sttr`;
const headers = {
  "x-api-key": process.env.STTR_BUILDER_API_KEY,
};

console.log("Using environment", env);
mkdirp.sync(outputDir);
const permitIds = Object.values(topics).flatMap((t) => t.map((a) => a.id));

/**
 * @param {object} obj - an object to convert to json-string
 * @returns {string} a json string
 */
function jsonString(obj) {
  return JSON.stringify(obj, ";", 2);
}

/**
 * Middleware for checking the status. Throws an error if response failed
 *
 * @param {any} res - the response object from node-fetch
 * @returns {any} the response object
 */
function checkStatus(res) {
  if (!res.ok) {
    // res.status >= 200 && res.status < 300
    console.error(res.statusText);
    res.text().then((text) => {
      console.error(text);
      throw Error(res.statusText);
    });
  }
  return res;
}

(async () => {
  fetch(listUrl, { headers })
    .then((res) => res.json())
    .then((json) => {
      const target = path.join(outputDir, "topics.source.json");
      fs.writeFile(target, jsonString(json), (err) => {
        if (err) throw err;
        console.log(`${target} has been saved`);
      });
      return json.map(({ _id }) => _id);
    });

  const permitsConfig = await batchPromises(MAX_PARALLEL, permitIds, (id) =>
    fetch(detailUrl, {
      method: "post",
      body: `activiteitId=${id}`,
      headers: {
        ...headers,
        "content-type": "application/x-www-form-urlencoded",
      },
    })
      .then(checkStatus)
      .then((res) => res.json())
      .then((json) => {
        fs.writeFile(
          path.join(outputDir, `${id}.source.json`),
          jsonString(json),
          (err) => {
            if (err) throw err;
            console.log(`${id}.source.json has been saved!`);
          }
        );
        return {
          id,
          json,
        };
      })
      .catch((e) => {
        console.error("Failed to get activity information for ", id, e);
      })
  );

  Object.entries(topics).forEach(([id, permits]) => {
    const file = `${id}.json`;

    const data = {
      id,
      permits: permits.map((permit) => {
        const res = permitsConfig.find((p) => p.id === permit.id);
        const version = res.json.version;
        if (typeof version !== "number") {
          throw new Error("version should be a number");
        }
        return {
          version,
          ...sttrbuild(res.json.sttr),
        };
      }),
    };
    fs.writeFile(path.join(outputDir, file), jsonString(data), (err) => {
      if (err) throw err;
      console.log(`'${file}' has been saved!`);
    });
  });
})();
