const debug = require("debug")("database");
const { Query, Pool } = require("pg");
const config = require("../config").resources.amsterdam.database;

const { submit } = Query.prototype;
Query.prototype.submit = function () {
  const text = this.text;
  const values = this.values;
  const query = values.reduce((q, v, i) => q.replace(`$${i + 1}`, v), text);
  console.log(query);
  submit.apply(this, arguments);
};

let connected = false;
debug("instantiating db pool now...");
const connectionPool = new Pool(config.connection);

const db = {
  getPool: async () => {
    try {
      debug(
        connected ? "Already connected!" : "Not connected, connecting now..."
      );
      if (!connected) {
        await connectionPool.connect();
        debug("Set connected to true");
        connected = true;
      }
      return connectionPool;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  query: async (text, params, reducer, many = true) => {
    const pool = await db.getPool();
    const res = await pool.query(text, params);
    const rows = res.rows.map(reducer);
    return many ? rows : rows[0];
  },
};

module.exports = db;
