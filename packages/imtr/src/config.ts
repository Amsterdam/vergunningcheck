import { APIConfig } from "./types.ts";

export const apis: APIConfig[] = [
  {
    host: "https://sttr-builder.eu.meteorapp.com/api/v2",
    outputDir: "imtr",
    topics: {
      "brandveilig-gebruik": [
        // firesafety
        "8hqLFZcdXKaesAJgS", // permit & report
      ],
      "dakkapel-plaatsen": [
        // dormer
        "WKPxKx4YBJ5fqYSni", // monument
        "Aa2EX3YprpZQ65non", // construction
      ],
      "dakraam-plaatsen": [
        // skylight
        "hMwHKR7Wz4FP8Dm4x", // monument
        "dRy4PfDs7jQPc9gMG", // construction
      ],
      "kozijnen-plaatsen": [
        // frame
        "Xm2WwYeGkNN9w6rgQ", // monument
        "5CJrbgbWZP6uZsouY", // construction
      ],
      "bouwwerk-slopen": [
        // demolition
        "bxBCdnrFZSbwxgmxC", // monument
        "2eYY7McaiRgfnERo9", // cityscape
        "D4mccynMtNdzYGhXF", // report
      ],
      "zonnepanelen-of-zonneboiler-plaatsen": [
        // solar panels or solar water heater
        "TRhZrFexMjBW42Ky6", // monument
        "skPG9qqTqWyX9tSY7", // construction
      ],
      "zonwering-of-rolluik-plaatsen": [
        // awning or roller shutter
        "AkxinYRNNo679qi6T", // monument
        "TuP6ido9xpJSSxjLi", // construction
      ],
      "formulier-bomenkap": [
        // @TODO: this is a test, and should be replaced with proper imtr files
        "Bahjnv7zHzRCW9fiD", // form for cutting a tree
      ],
    },
  },
];
