console.log("config_file", process.env.CONFIG_FILE);

module.exports = require(`./${process.env.CONFIG_FILE || "production"}`);
