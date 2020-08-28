import { APIConfig } from "./types.ts";

export const apis: APIConfig[] = [
  {
    host: "https://sttr-builder.eu.meteorapp.com/api/v2",
    outputDir: "sttr",
    topics: {
      "dakkapel-plaatsen": ["WKPxKx4YBJ5fqYSni", "Aa2EX3YprpZQ65non"],
      "dakraam-plaatsen": ["hMwHKR7Wz4FP8Dm4x", "dRy4PfDs7jQPc9gMG"],
      "kozijnen-plaatsen": ["Xm2WwYeGkNN9w6rgQ", "5CJrbgbWZP6uZsouY"],
      "zonnepanelen-of-zonneboiler-plaatsen": [
        "TRhZrFexMjBW42Ky6",
        "skPG9qqTqWyX9tSY7",
      ],
      "zonwering-of-rolluik-plaatsen": [
        "AkxinYRNNo679qi6T",
        "TuP6ido9xpJSSxjLi",
      ],
    },
  },
];
