const merge = require("lodash/merge");
const base = require("./default");

const config = {
  loaders: {
    ois: {
      HOST: "http://127.0.0.1:8000",
    }
  }
}

module.exports = merge(base, config);