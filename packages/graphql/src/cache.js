const debug = require("debug")("graphql:cache");
const redisModule = require("redis");
const redisMockModule = require("redis-mock");
const { promisify } = require("util");
const { redisUrl, mocked } = require("../config").cache;

const cachePrefix = "4_";
const redis = mocked ? redisMockModule : redisModule;

if (mocked) {
  debug("Using redis-mock instead of actual Redis");
}

const client = redis.createClient({
  url: redisUrl,
});

const getAsync = promisify(client.get).bind(client);

const withCache = async (key, fn, ttlInSeconds) => {
  const cacheKey = `${cachePrefix}${key}`;
  const cached = await getAsync(cacheKey);

  if (cached !== null) {
    debug("cache hit", cacheKey, cached.substring(0, 20));
    return JSON.parse(cached);
  }
  const result = await fn();
  debug("cache MISS", cacheKey, result);
  client.set(cacheKey, JSON.stringify(result), "EX", ttlInSeconds);
  return result;
};

module.exports = {
  withCache,
  client,
};
