require("dotenv-flow").config({
  path: "./config",
});

const config = require("./config");
const app = require("./app");

app.listen(config.port, () =>
  console.log(
    `🚀 Server running at http://localhost:${config.port}/${config.path}`
  )
);
