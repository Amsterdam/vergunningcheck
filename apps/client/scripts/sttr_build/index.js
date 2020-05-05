/* eslint no-console: 0 */
const yargs = require("yargs");
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const batchPromises = require("batch-promises");
const sttrbuild = require("./parser");
const topics = require("./config");

const { argv } = yargs
  .option("output", {
    alias: "o",
    description: "Directory to place json output.",
    type: "string",
  })
  .help()
  .alias("help", "h");

const OUTPUT_DIR = argv.output;

if (!OUTPUT_DIR) {
  throw Error('"output" not specified. Please provide --output=./some/path');
}

const MAX_PARALLEL = 6;
const env = process.env.STTR_ENV === "production" ? "PROD" : "STAGING";
const sttrApi = `https://sttr-builder${
  env === "PROD" ? "" : "-staging"
}.eu.meteorapp.com/api`;
const listUrl = `${sttrApi}/activiteiten`;
const detailUrl = `${sttrApi}/conclusie/sttr`;
const headers = {
  "x-api-key": process.env.STTR_BUILDER_API_KEY,
};

console.log("Using environment", env);

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
  const permitIds = await fetch(listUrl, { headers })
    .then((res) => res.json())
    .then((json) => {
      const target = path.join(OUTPUT_DIR, "topics.source.json");
      fs.writeFile(target, jsonString(json), (err) => {
        if (err) throw err;
        console.log(`${target} has been saved`);
      });
      return json.map(({ _id }) => _id);
    });

  const permitsXML = await batchPromises(MAX_PARALLEL, permitIds, (id) =>
    fetch(detailUrl, {
      method: "post",
      body: `activiteitId=${id}`,
      headers: {
        ...headers,
        "content-type": "application/x-www-form-urlencoded",
      },
    })
      .then(checkStatus)
      .then((res) => res.text())
      .then((xml) => ({
        id,
        xml,
      }))
      .catch((e) => {
        console.error("Failed to get xml for ", id, e);
      })
  );

  // write activity source xml files
  permitsXML.forEach(({ id, xml }) => {
    fs.writeFile(path.join(OUTPUT_DIR, `${id}.xml`), xml, (err) => {
      if (err) throw err;
      console.log(`${id}.xml has been saved!`);
    });
  });

  Object.entries(topics).forEach(([id, permits]) => {
    const file = `${id}.json`;
    const data = {
      id,
      permits: permits.map((permit) =>
        sttrbuild(permitsXML.find((p) => p.id === permit.id).xml)
      ),
    };
    fs.writeFile(path.join(OUTPUT_DIR, file), jsonString(data), (err) => {
      if (err) throw err;
      console.log(`'${file}' has been saved!`);
    });
  });
})();
