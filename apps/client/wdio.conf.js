// Test setup for typescript following https://webdriver.io/docs/typescript.html#typed-configuration
require("ts-node").register({ transpileOnly: true });
module.exports = require("./wdio.conf.ts");
