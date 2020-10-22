const selectors = require("../selectors");

const config = {
  domain: "http://localhost:3000", // @TODO read from environment variable
  selectors,
};

module.exports = config;
