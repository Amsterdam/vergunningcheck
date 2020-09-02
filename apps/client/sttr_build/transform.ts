import { emptyDir, readJson, writeJson } from "https://deno.land/std/fs/mod.ts";
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

// get __dirname (https://stackoverflow.com/questions/61829367/node-js-dirname-filename-equivalent-in-deno)
const __dirname = new URL(".", import.meta.url).pathname;
const topicsJsonPath = join(__dirname, "..", "src", "topics.json");
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

/**
 * Preprocessors are used to change the incoming xml. The xml
 * is not yet parsed, so they are basic find replace functions.
 * The output of every preprocessor is passed as input to the next.
 */
const preprocessors = [
  // Replace phone number with Link
  (str: string) => str.replace(/ 14\s?020/g, " [14 020](tel:14020)"),
];

const apisMap: object[] = apis.map(async (api: APIConfig) => {
  const { outputDir } = api;
  const transformedOutputPath = join(outputDir, "transformed");
  const transformedDir = join(baseDir, transformedOutputPath);
  await emptyDir(transformedDir);

  let topics: TopicOutputType[] = Object.entries(api.topics).map(
    ([slug, topic]: [string, string[]]) => ({
      path: `${transformedOutputPath}/${slug}.json`,
      permits: topic,
      slug,
    })
  );

  const apiPermits: TopicInputType[] = (await readJson(
    join(baseDir, outputDir, "list.json")
  )) as TopicInputType[];
  const apiPermitIds: string[] = apiPermits.map(
    ({ _id }: TopicInputType) => _id
  );

  apiPermitIds.forEach((permitId) => {
    topics.push({
      name: apiPermits.find((permit) => permit._id === permitId)?.name,
      path: `${transformedOutputPath}/${permitId}.json`,
      permits: [permitId],
      slug: permitId,
    });
  });

  /* Convert multiple permit-xml files per topic to a json string and write to the [topic].json file */
  topics.forEach(async (topic: TopicOutputType) => {
    const { slug, permits } = topic;
    const topicJsonContent = {
      permits: await Promise.all(
        permits.map(async (permitId) => {
          const apiPermit = apiPermits.find(
            (apiPermit: TopicInputType) => apiPermit._id === permitId
          );
          if (!apiPermit) {
            throw new Error(`apiPermit not found for id ${permitId}`);
          }

          const { sttr: xml, version } = (await readJson(
            join(baseDir, outputDir, `${permitId}.json`)
          )) as PermitResponse;

          if (typeof version !== "number") {
            throw new Error("version should be a number");
          }

          // apply all reducers to sttr
          const content = preprocessors.reduce((acc, curr) => curr(acc), xml);

          const sttr = await sttrbuild(content);
          return {
            version,
            ...sttr,
          };
        })
      ),
      slug,
    };

    writeJson(join(transformedDir, `${slug}.json`), topicJsonContent);
  });
  return topics;
});

const permitsJsons = await Promise.all(apisMap);
await writeJson(topicsJsonPath, permitsJsons);
