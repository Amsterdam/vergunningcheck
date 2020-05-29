const express = require("express");
const { server } = require("./src/graphql");
const config = require("config");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();

// Hardening
app.use(helmet());

// Loosening
if (config.cors.enabled) {
  app.use(cors());
}

// Basic access log, BUT no permission to log IP
app.use(
  morgan(
    ':remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time/:total-time ms'
  )
);

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

app.listen(config.port, () =>
  console.log(
    `🚀 Server running at http://localhost:${config.port}/${config.path}`
  )
);
