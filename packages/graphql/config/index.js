// eslint-disable-next-line import/no-dynamic-require
module.exports = require(`./${
  process.env.CONFIG_FILE || process.env.NODE_ENV
}`);
