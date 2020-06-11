const serverless = require("serverless-http");
const express = require("express");

const app = express();

app.use(`/graphql`, (_, res) => {
  res.send("OK");
});

exports.handler = serverless(app, {
  basePath: "/.netlify/functions",
});
