const redis = require("redis");
const { promisify } = require("util");
const config = require("../config");

const { enabled, redisUrl } = config.cache;

const client =
  enabled &&
  redis.createClient({
    url: redisUrl,
  });

const cachePrefix = "4_";

let getAsync;
if (client) {
  getAsync = promisify(client.get).bind(client);
}

module.exports = {
  cachePrefix,
  client,
  enabled,
  getAsync,
  setSync: client && client.set.bind(client),
};
