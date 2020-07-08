const cors = require("cors");

module.exports = (app) => {
  app.use(cors());
  return app;
};
