const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { Pool, Client } = require("pg");

const config = require("./config");
const { server } = require("./src/graphql");
const secure = require("./src/secure");
const development = require("./src/development");

const app = secure(express());
if (process.env.NODE_ENV !== "production") {
  development(app);
}

// TODO: const pool = new Pool()

// Basic access log, BUT no permission to log IP
app.use(
  morgan(
    ':remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time/:total-time ms'
  )
);

// Not sure why but (at least dev-server of) netlify needs a bodyParser
app.use(bodyParser.json());

// Error handling
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something broke!");
});

const c = {
  host: "db01.acc.dsq.amsterdam.nl",
  database: "dsr_vergunningchecker_dev",
  // port: 5432,
  user: "vergunningchecker",
  password: process.env.DB_PASS,
};

// db poc
app.use(`/db`, async (_, resp) => {
  const client = new Client(c);
  await client.connect();
  const res = await client.query("SELECT * FROM grn_vegetatieobject");
  console.log(res.rows);
  const result = JSON.stringify(res.rows);
  await client.end();
  resp.send(result);
});

// Setup main graphql application logic
app.use(`/${config.path}`, server);

// Setup health endpoint for cluster management
app.use(`/${config.healthPath}`, (_, res) => {
  res.send("OK");
});

module.exports = app;
