const debug = require("debug")("graphql:util");
const xml2js = require("xml2js");
const fetch = require("node-fetch");
const { stringify } = require("querystring");
const { enabled, getAsync, setSync, cachePrefix } = require("./cache");

const parser = new xml2js.Parser();

const qs = (obj) => (obj ? `?${stringify(obj)}` : "");
const noop = async (_, fn) => fn();
const getUrl = (path, params) => path + qs(params);
const withLog = (msg, res) => {
  debug(msg);
  return res;
};

const fetchJson = (url) => {
  debug(`fetching '${url}'`);
  return fetch(url).then((res) => res.json());
};
const gql = (input) => input.toString();

const withCache = async (key, fn, ttlInSeconds) => {
  const cacheKey = `${cachePrefix}${key}`;
  const cached = await getAsync(cacheKey);

  if (cached !== null) {
    debug("cache hit", cacheKey, cached.substring(0, 20));
    return JSON.parse(cached);
  }
  const result = await fn();
  debug("cache MISS", cacheKey, result);
  setSync(cacheKey, JSON.stringify(result), "EX", ttlInSeconds);
  return result;
};

const postXml = (url, body) => {
  debug(`fetching '${url}'`);
  return fetch(url, {
    method: "POST",
    body,
  })
    .then((response) => response.text())
    .then((xml) => parser.parseStringPromise(xml));
};

module.exports = {
  fetchJson,
  gql,
  getUrl,
  postXml,
  withLog,
  withCache: enabled ? withCache : noop,
};
