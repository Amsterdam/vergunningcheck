import { readJson, writeJson } from "https://deno.land/std/fs/mod.ts";
import { join } from "https://deno.land/std/path/mod.ts";

import sttrbuild from "./parser.ts";
import { APIConfig } from "./types.d.ts";

// XXX npm run sttr moet deno aanroepen
// XXX document...
if (Deno.args.length < 1) {
  console.error(`
Dev usage:
$ deno run --unstable --allow-net --allow-write --allow-read transform.ts BASE_DIR --config=config.local.ts (default=config.ts)
`);
  Deno.exit();
}

const baseDir = join(Deno.cwd(), Deno.args[0]);
const { apis }: { apis: APIConfig[] } = await import(
  join(Deno.cwd(), "config.local.ts")
); // XXX convert to cli argument

const permitIds: string[] = apis.flatMap((api: APIConfig) =>
  Object.values(api.topics)
);

const apisMap: object[] = apis.map(async (api: APIConfig) => {
  const { outputDir, version } = api;
  const topics: { [key: string]: string[] } = api.topics;

  const apiPermits: any = await readJson(join(baseDir, outputDir, "list.json"));
  const apiPermitIds: string[] = apiPermits.map(({ _id }: any) => _id);

  apiPermitIds.forEach((permitId) => {
    if (permitIds.indexOf(permitId) === -1) {
      topics[permitId] = [permitId];
    }
  });

  // XXX duplicate parsing of xml's for topics defined in config
  // XXX i want them in separate sttr-json's but only parse them once?

  // Put json-sttr-version from flolegal in our sttr-json

  /* Convert multiple permit-xml files per topic to a json string and write to the [topic].json file */
  Object.entries(topics).forEach(([slug, permits]: [string, string[]]) => {
    const topicJsonContent = {
      slug,
      permits: permits.map(async (permitId) => {
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

        // console.log('for', slug, 'parse', permitId)
        return sttrbuild(xml);
      }),
    };
    writeJson(join(baseDir, outputDir, `${slug}.json`), topicJsonContent);
  });

  return topics;
});

const permitsJsons = await Promise.all(apisMap);

await writeJson(join(baseDir, "topics.json"), permitsJsons);

// const topic: sttrJson = generate([xml1, xml2])
