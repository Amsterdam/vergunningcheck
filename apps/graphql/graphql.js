// process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";

const serverless = require("serverless-http");

const app = require("./app");

exports.handler = serverless(app, {
  basePath: "/.netlify/functions",
});
