const getPool = require("../../database");

// TODO: consider moving this file to a different folder as it is not related to
// the rest api loaders. Also the setup is different and it uses no caching.

const loader = {
  reducer: (o) => ({
    id: o.bk_grn_vegetatieobject,
  }),
  fetch: async () => {
    const pool = await getPool();
    const res = await pool.query("SELECT * FROM grn_vegetatieobject LIMIT 10");
    return res.rows.map(loader.reducer);
  },
};

module.exports = loader;
