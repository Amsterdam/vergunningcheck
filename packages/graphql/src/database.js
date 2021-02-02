const debug = require("debug")("graphql:database");
const { Query, Pool } = require("pg");
const config = require("../config").resources.amsterdam.database;

const { submit } = Query.prototype;
Query.prototype.submit = function () {
  const text = this.text;
  const values = this.values;
  const query = values.reduce((q, v, i) => q.replace(`$${i + 1}`, v), text);
  debug(query);
  submit.apply(this, arguments);
};

debug("instantiating db pool now...");
const pool = new Pool(config.connection);

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on("error", (err) => {
  console.error("Unexpected error on idle postgres client", err);
});

const db = {
  close: () => {
    pool.end();
  },
  query: async (text, params, reducer, many = true) => {
    const client = await pool.connect();

    let rows;
    try {
      rows = (await pool.query(text, params)).rows;
    } finally {
      // Make sure to release the client before any error handling,
      // just in case the error handling itself throws an error.
      client.release();
    }
    return many ? rows.map(reducer) : reducer(rows[0]);
  },
};

module.exports = db;
