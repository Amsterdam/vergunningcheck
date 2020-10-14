import { join, emptyDir } from "./deps.ts";
import { readJson, writeJson } from "./util.ts";
import imtrbuild from "./parser.ts";

import type {
  APIConfig,
  PermitResponse,
  TopicInputType,
  TopicOutputType,
} from "./types.ts";

type Props = {
  config: string;
  dir: string;
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
        name: apiPermits.find((permit) => permit._id === permitId)?.name?.trim(),
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

            // write xml file so we can transform it
            const xmlPath = join(publicDir, outputDir, `${permitId}.xml`);
            await Deno.writeTextFile(xmlPath, xml);

            // parse xml and save as json
            const parsedPath = join(publicDir, outputDir, `${permitId}.parsed.json`);

            const p = await Deno.run({
              cmd: ["packages/imtr/xml2json", xmlPath],
              stdout: "piped",
              stderr: "piped",
            });

            // await p.status();
            const jsonText = new TextDecoder().decode(await p.output());

            // apply all reducers to imtr
            try {
              const json = JSON.parse(preprocessors.reduce((acc, curr) => curr(acc), jsonText));
              await writeJson(parsedPath, json);
              const imtr = await imtrbuild(json) as any;
              return {
                version,
                ...imtr,
              };
            } catch (e) {
              console.error(`failed to convert json for ${permitId}`)
              throw (e);
            }
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
