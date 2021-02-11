const debug = require("debug")("graphql:util");
const xml2js = require("xml2js");
const fetch = require("node-fetch");
const { stringify } = require("querystring");

const parser = new xml2js.Parser();

const qs = (obj) => (obj ? `?${stringify(obj)}` : "");
const getUrl = (path, params) => path + qs(params);
const withLog = (msg, res) => {
  debug(msg);
  return res;
};

function checkStatus(res) {
  if (!res.ok) {
    throw Error(res.statusText);
  }
  return res;
}

const fetchJson = (url) => {
  debug(`fetching '${url}'`);
  return fetch(url)
    .then(checkStatus)
    .then((res) => res.json());
};
const gql = (input) => input.toString();

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
};
