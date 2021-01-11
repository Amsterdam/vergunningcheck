const debug = require("debug")("datapuntDb");
const { Pool } = require("pg");
const config = require("../config").resources.datapuntDb.client;

let connected = false;
debug("instantiating db pool now...");
const pool = new Pool(config);

module.exports = async () => {
  try {
    debug(
      connected ? "Already connected!" : "Not connected, connecting now..."
    );
    if (!connected) {
      await pool.connect();
      debug("Set connected to true");
      connected = true;
    }
    return pool;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
