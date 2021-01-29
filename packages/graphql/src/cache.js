const redis = require("redis");
const { promisify } = require("util");
const config = require("../config");

const { redisUrl } = config.cache;

const cachePrefix = "4_";

const client = redis.createClient({
  url: redisUrl,
});

module.exports = {
  cachePrefix,
  client,
  getAsync: promisify(client.get).bind(client),
  setSync: client && client.set.bind(client),
};
