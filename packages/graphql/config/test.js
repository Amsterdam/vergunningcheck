const base = require("./default");

base.cache.redis = { mocked: true };

module.exports = base;
