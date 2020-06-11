const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const config = require("./config");
const { server } = require("./src/graphql");
const secure = require("./src/secure");
const development = require("./src/development");

const app = secure(express());
if (process.env.NODE_ENV !== "production") {
  development(app);
}

// Basic access log, BUT no permission to log IP
app.use(
  morgan(
    ':remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time/:total-time ms'
  )
);

// Not sure why but (at least dev-server of) netlify needs a bodyParser
app.use(bodyParser.json());

// Error handling
app.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).send("Something broke!");
});

// Setup main graphql application logic
app.use(`/${config.path}`, server);

// Setup health endpoint for cluster management
app.use(`/${config.healthPath}`, (_, res) => {
  res.send("OK");
});

module.exports = app;
