const merge = require("lodash.merge");

const base = require("./default");

const config = {
  cache: {
    redis: false,
  },
};
module.exports = merge(base, config);
