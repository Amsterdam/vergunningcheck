import { readJson, writeJson } from "https://deno.land/std/fs/mod.ts";
import { join } from "https://deno.land/std/path/mod.ts";
import parser from "https://deno.land/x/yargs_parser/deno.ts";

import sttrbuild from "./parser.js";
import { APIConfig } from "./types.ts";

// TODO: Improve 'usage', waiting for yargs to be ported https://github.com/yargs/yargs/issues/1661
const argv = parser(Deno.args, {
  string: ["dir", "config"],
});

if (!argv.dir) {
  console.error(
    `Usage:\n$ deno run --unstable --allow-read --allow-write transform.ts --dir=path/to/sttr [--config=config.ts]\n`
  );
  Deno.exit();
}

const baseDir = join(Deno.cwd(), argv.dir);

const { apis }: { apis: APIConfig[] } = await import(
  argv.config ? join(Deno.cwd(), argv.config) : "./config.ts"
);

const permitIds: string[] = apis
  .flatMap((api) => Object.values(api.topics))
  .flat();

type TopicOutputType = { permits: string[]; slug: string; path: string };

const apisMap: object[] = apis.map(async (api: APIConfig) => {
  const { outputDir, version } = api;

  const topics: TopicOutputType[] = Object.entries(
    api.topics
  ).map(([slug, topic]: [string, string[]]) => ({
    permits: topic,
    path: `${api.outputDir}/${slug}`,
    slug,
  }));

  const apiPermits: any = await readJson(
    join(baseDir, outputDir, "list.source.json")
  );
  const apiPermitIds: string[] = apiPermits.map(({ _id }: any) => _id);

  apiPermitIds.forEach((permitId) => {
    if (permitIds.indexOf(permitId) === -1) {
      topics.push({
        slug: permitId,
        permits: [permitId],
        path: `${api.outputDir}/${permitId}`,
      });
    }
  });

  // XXX duplicate parsing of xml's for topics defined in config
  // XXX i want them in separate sttr-json's but only parse them once?

  // Put json-sttr-version from flolegal in our sttr-json

  /* Convert multiple permit-xml files per topic to a json string and write to the [topic].json file */
  topics.forEach(async ({ slug, permits }: TopicOutputType) => {
    const topicJsonContent = {
      slug,
      permits: await Promise.all(
        permits.map(async (permitId) => {
          const apiPermit = apiPermits.find(
            (apiPermit: any) => apiPermit._id === permitId
          );
          if (!apiPermit) {
            throw new Error(`apiPermit not found for id ${permitId}`);
          }

          let xml;
          if (version === 2) {
            const perm: any = await readJson(
              join(baseDir, outputDir, `${permitId}.source.json`)
            );
            xml = perm.sttr;
          } else {
            xml = await Deno.readTextFile(
              join(baseDir, outputDir, `${permitId}.xml`)
            );
          }

          console.log("for", slug, "parse", permitId);
          return sttrbuild(xml);
        })
      ),
    };
    console.log("write json", { ...topicJsonContent.permits });
    writeJson(join(baseDir, outputDir, `${slug}.json`), topicJsonContent);
  });

  return topics;
});

const permitsJsons = await Promise.all(apisMap);

await writeJson(join(baseDir, "topics.json"), permitsJsons);

// const topic: sttrJson = generate([xml1, xml2])
