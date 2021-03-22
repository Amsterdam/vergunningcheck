import address = require("../address");
import host = require("../host");
import selectors = require("../selectors");

const config = {
  address,
  domain: host,
  selectors,
};

module.exports = config;
