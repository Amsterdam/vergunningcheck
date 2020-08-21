import { readJson, writeJson } from "https://deno.land/std/fs/mod.ts";
import { join } from "https://deno.land/std/path/mod.ts";
import parser from "https://deno.land/x/yargs_parser/deno.ts";

import sttrbuild from "./parser.js";
import {
  APIConfig,
  PermitResponse,
  TopicInputType,
  TopicOutputType,
} from "./types.ts";

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

// We want to prevent duplicate keys for topics
{
  const topicKeys = apis.flatMap((api) => Object.keys(api.topics));
  if (new Set(topicKeys).size !== topicKeys.length) {
    throw new Error("duplicate keys found");
  }
}

const apisMap: object[] = apis.map(async (api: APIConfig) => {
  const { outputDir } = api;

  let topics: TopicOutputType[] = Object.entries(api.topics).map(
    ([slug, topic]: [string, string[]]) => ({
      permits: topic,
      path: `${api.outputDir}/${slug}`,
      slug,
    })
  );

  const apiPermits: TopicInputType[] = (await readJson(
    join(baseDir, outputDir, "list.source.json")
  )) as TopicInputType[];
  const apiPermitIds: string[] = apiPermits.map(
    ({ _id }: TopicInputType) => _id
  );

  apiPermitIds.forEach((permitId) => {
    topics.push({
      slug: permitId,
      permits: [permitId],
      path: `${api.outputDir}/${permitId}`,
      name: apiPermits.find((permit) => permit._id === permitId)?.name,
    });
  });

  /* Convert multiple permit-xml files per topic to a json string and write to the [topic].json file */
  topics.forEach(async (topic: TopicOutputType) => {
    const { slug, permits } = topic;
    const topicJsonContent = {
      slug,
      permits: await Promise.all(
        permits.map(async (permitId) => {
          const apiPermit = apiPermits.find(
            (apiPermit: TopicInputType) => apiPermit._id === permitId
          );
          if (!apiPermit) {
            throw new Error(`apiPermit not found for id ${permitId}`);
          }

          const { sttr: xml, version } = (await readJson(
            join(baseDir, outputDir, `${permitId}.source.json`)
          )) as PermitResponse;

          if (typeof version !== "number") {
            throw new Error("version should be a number");
          }

          const sttr = await sttrbuild(xml);
          return {
            version,
            ...sttr,
          };
        })
      ),
    };

    writeJson(join(baseDir, outputDir, `${slug}.json`), topicJsonContent);
  });
  return topics;
});

const permitsJsons = await Promise.all(apisMap);
await writeJson(join(baseDir, "topics.json"), permitsJsons);
