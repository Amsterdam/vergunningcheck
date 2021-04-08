import { APIConfig } from "./types/index.ts";

export const apis: APIConfig[] = [
  {
    host: "https://sttr-builder.eu.meteorapp.com/api/v2",
    outputDir: "imtr",
    topics: {
      // dormer
      "dakkapel-plaatsen": [
        "WKPxKx4YBJ5fqYSni", // monument
        "Aa2EX3YprpZQ65non", // construction
      ],
      // skylight
      "dakraam-plaatsen": [
        "hMwHKR7Wz4FP8Dm4x", // monument
        "dRy4PfDs7jQPc9gMG", // construction
      ],
      // frame
      "kozijnen-plaatsen": [
        "Xm2WwYeGkNN9w6rgQ", // monument
        "5CJrbgbWZP6uZsouY", // construction
      ],
      // demolition
      "bouwwerk-slopen": [
        "bxBCdnrFZSbwxgmxC", // monument
        "D4mccynMtNdzYGhXF", // report
        "2eYY7McaiRgfnERo9", // cityscape
      ],
      // solar panels or solar water heater
      "zonnepanelen-of-zonneboiler-plaatsen": [
        "TRhZrFexMjBW42Ky6", // monument
        "skPG9qqTqWyX9tSY7", // construction
      ],
      // awning or roller shutter
      "zonwering-of-rolluik-plaatsen": [
        "AkxinYRNNo679qi6T", // monument
        "TuP6ido9xpJSSxjLi", // construction
      ],
    },
  },
];
