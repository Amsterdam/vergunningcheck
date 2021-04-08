import { join, emptyDir, JSONPermit, JSONPermitInner } from "./deps.ts";
import { readJson, writeJson } from "./util.ts";
import imtrbuild from "./parser.ts";

import type {
  APIConfig,
  PermitResponse,
  TopicInputType,
  TopicOutputType,
} from "./types/index.ts";

type Props = {
  config: string;
  dir: string;
};

const warn = (msg: string) => {
  console.warn(
    `====================================\n${msg}\n====================================\n`
  );
};

export default async (argv: Props) => {
  const baseDir = join(Deno.cwd(), argv.dir);
  const publicDir = join(baseDir, "public");

  const topicsJsonPath = join(Deno.cwd(), argv.dir, "src", "topics.json");

  const config = (await import(
    argv.config ? join(Deno.cwd(), argv.config) : "./config.ts"
  )) as { apis: APIConfig[] };
  const { apis } = config;

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
        name: apiPermits
          .find((permit) => permit._id === permitId)
          ?.name?.trim(),
        path: `${transformedUrlPath}/${permitId}.json`,
        permits: [permitId],
        slug: permitId,
      });
    });

    /* Convert multiple permit-xml files per topic to a json string and write to the [topic].json file */
    topics.forEach(async (topic: TopicOutputType) => {
      let error = false;
      const { slug, permits } = topic;
      const topicJsonContent = {
        permits: await Promise.all(
          permits.map(async (permitId, permitIndex) => {
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
            const parsedPath = join(
              publicDir,
              outputDir,
              `${permitId}.parsed.json`
            );

            const p = await Deno.run({
              cmd: ["packages/imtr/xml2json", xmlPath],
              stdout: "piped",
              stderr: "piped",
            });

            // await p.status();
            const jsonText = new TextDecoder().decode(await p.output());

            // apply all reducers to imtr
            try {
              // Run preprocessors on raw json string
              const json = JSON.parse(
                preprocessors.reduce((acc, reducer) => reducer(acc), jsonText)
              );

              await writeJson(parsedPath, json);
              const imtr = (await imtrbuild(json)) as JSONPermitInner;

              /* Give questions a higher priority-number (so _less_ important) matching
               * the weight with the number of questions per permit
               *
               * One implementation could be like this:
               *   `result.prio = permit.questions.length * 10000 + question.prio`
               * Another solution would be using the order of permit-id's in our config.
               * See implementation below.
               */
              imtr.questions = imtr.questions.map((question: any) => {
                return {
                  ...question,
                  prio: question.prio + permitIndex * 10000,
                };
              });

              const result: JSONPermit = {
                version,
                ...imtr,
              };
              return result;
            } catch (e) {
              error = true;
              warn(`Failed to convert json for ${permitId}! ${e}`);

              //throw e;
            }
          })
        ),
        slug,
      };
      if (error) {
        warn(
          `Cannot write ${slug} as one or more of it's permits failed to transform.`
        );
      } else {
        writeJson(join(transformedDir, `${slug}.json`), topicJsonContent);
      }
    });
    return topics;
  });

  const permitsJsons = await Promise.all(apisMap);
  writeJson(topicsJsonPath, permitsJsons);
};
