import { apis } from "./config.ts";
export * from "./config.ts";

apis.push({
  outputDir: "test",
  host: "https://...",
  topics: [
    {
      slug: "some-slug",
      permits: {
        id: "The name",
      },
    },
  ],
});

export { apis };
