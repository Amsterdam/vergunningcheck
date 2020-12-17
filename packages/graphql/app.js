const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const puppeteer = require("puppeteer");

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
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something broke!");
});

// Setup pdf service
app.get("/graphql/pdfr/:slug", async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const pdfFrontend =
    config.pdfFrontend || `${req.protocol}://${req.headers.host}`;
  const url = `${pdfFrontend}/${
    req.params.slug
  }/vragen-en-uitkomst?data=${encodeURIComponent(req.query.data)}`;

  await page.goto(url);
  const pdf = await page.pdf();
  res.contentType("application/pdf");

  // res.setHeader('Content-Length', stat.size);
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=indieningsvereisten.pdf"
  );
  res.send(pdf);
});

// Setup main graphql application logic
app.use(`/${config.path}`, server);

// Setup health endpoint for cluster management
app.use(`/${config.healthPath}`, (_, res) => {
  res.send("OK");
});

module.exports = app;
