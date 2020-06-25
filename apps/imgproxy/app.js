const express = require("express");
const { expressSharp, HttpAdapter } = require("express-sharp");

const app = express();

// Fetch original images via HTTP
app.use(
  "/imageproxy/",
  expressSharp({
    imageAdapter: new HttpAdapter({
      prefixUrl:
        "https://s3.eu-central-1.amazonaws.com/sttr-builder-staging.flolegal.app/",
    }),
  })
);

module.exports = app;
