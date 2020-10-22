const selectors = require("../selectors");

const config = {
  domain: "http://localhost:3030", // @TODO read from environment variable
  olo: {
    selectors: {
      locationForm: "#locatieWerkzaamhedenForm",
    },
  },
  selectors,
};

module.exports = config;
