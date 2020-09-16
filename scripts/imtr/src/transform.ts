import { join, emptyDir } from "./deps.ts";

import { readJson, writeJson } from "./util.ts";
import imtrbuild from "./parser.ts";

import {
  APIConfig,
  PermitResponse,
  TopicInputType,
  TopicOutputType,
} from "./types.ts";

type Props = {
  dir: string;
  config: string;
  maxConnections: number;
}

export default async (argv: Props) => {

  const baseDir = join(Deno.cwd(), argv.dir);
  const publicDir = join(baseDir, "public");

  const topicsJsonPath = join(Deno.cwd(), argv.dir, "src", "topics.json");

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
    const transformedUrlPath = join(outputDir, "transformed");
    const transformedDir = join(publicDir, transformedUrlPath);
    await emptyDir(transformedDir);

    let topics: TopicOutputType[] = Object.entries(api.topics).map(
      ([slug, topic]: [string, string[]]) => ({
        path: `${transformedUrlPath}/${slug}.json`,
        permits: topic,
        slug,
      })
    );

    const listFile = join(publicDir, outputDir, "list.json");
    const apiPermits: TopicInputType[] = (await readJson(
      listFile
    )) as TopicInputType[];
    const apiPermitIds: string[] = apiPermits.map(
      ({ _id }: TopicInputType) => _id
    );

    apiPermitIds.forEach((permitId) => {
      topics.push({
        name: apiPermits.find((permit) => permit._id === permitId)?.name,
        path: `${transformedUrlPath}/${permitId}.json`,
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
              join(publicDir, outputDir, `${permitId}.json`)
            )) as PermitResponse;

            if (typeof version !== "number") {
              throw new Error("version should be a number");
            }

            // apply all reducers to imtr
            const content = preprocessors.reduce((acc, curr) => curr(acc), xml);

            const imtr = await imtrbuild(content) as any;
            return {
              version,
              ...imtr,
            };
          })
        ),
        slug,
      };

      writeJson(join(transformedDir, `${slug}.json`), topicJsonContent)
    });
    return topics;
  });

  const permitsJsons = await Promise.all(apisMap);
  writeJson(topicsJsonPath, permitsJsons)
}
