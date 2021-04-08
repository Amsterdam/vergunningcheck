const fetch = require("node-fetch");
const args = process.argv;

const options = {
  method: args[3].toUpperCase(),
  body: `id=${args[4]}`,
  headers: {
    "x-api-key": process.env.STTR_BUILDER_API_KEY,
    "content-type": "application/x-www-form-urlencoded",
  },
};

console.log(options.method, args[2], options.body);

fetch(args[2], options)
  .then((res) => res.json())
  .then(console.log);
