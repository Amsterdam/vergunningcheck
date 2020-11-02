const redis = require("redis");
const { promisify } = require("util");
const config = require("../config");

// Setup cache
const redisConfig = config.cache.redis;
const client = redisConfig && redis.createClient(redisConfig);

const cachePrefix = "4_";

let getAsync;
if (client) {
  getAsync = promisify(client.get).bind(client);
}

module.exports = {
  cachePrefix,
  client,
  enabled: !!client,
  getAsync,
  setSync: client.set,
};
