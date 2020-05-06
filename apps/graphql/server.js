const express = require("express");
const { server } = require("./src/graphql");
const config = require("config");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const port = process.env.PORT || config.port;
const app = express();

// Hardening
app.use(helmet());
app.disable("x-powered-by");

if (config.cors.enabled) {
  app.use(cors());
}

// Basic access log, BUT no permission to log IP
app.use(
  morgan(
    ':remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
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

app.listen(port, () =>
  console.log(
    `🚀 Server running at http://localhost:${port}/${config.path}`,
    `config.cache = `,
    config.cache
  )
);
