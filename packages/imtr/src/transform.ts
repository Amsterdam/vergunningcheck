import { join, emptyDir } from "./deps.ts";
import { getId, readJson, writeJson } from "./util.ts";
import imtrbuild from "./parser.ts";

import type {
  APIConfig,
  PermitResponse,
  TopicInputType,
  TopicOutputType,
} from "./types.ts";

import { JSONQuestion, JSONPermit, JSONDecisions } from "./types/json.ts";

type Props = {
  config: string;
  dir: string;
};

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

  /**
   * Preprocessors are used to change the parsed imtr file.
   * The output of every preprocessor is passed as input to the next,
   * so keep in mind the order of this array.
   */
  const postprocessors: ((
    imtr: JSONPermit,
    options: { permitIndex: number }
  ) => JSONPermit)[] = [
    /**
     * We actually don't need the `inputs` from DMN, we link question
     * to decisions directly.
     *
     * @param imtr - The parsed imtr
     */
    ({ inputs, ...imtr }) => imtr,

    /**
     * Give questions a higher priority-number (so _less_ important) matching
     * the weight with the number of questions per permit
     *
     * One implementation could be like this:
     *   `result.prio = permit.questions.length * 10000 + question.prio`
     * Another solution would be using the order of permit-id's in our config.
     * See implementation below.
     *
     * @param imtr - The parsed imtr
     * @param options - Options object, at least containing the `permitIndex`
     */
    ({ questions, ...imtr }, { permitIndex }) => ({
      ...imtr,
      questions: questions.map((question: any) => ({
        ...question,
        prio: question.prio + permitIndex * 10000,
      })),
    }),

    /**
     * We override the imtr id's for questions and decisions. We don't
     * want to rely on external parties id's at runtime. This also prevents
     * many git-conflicts because of changing id's when actually nothing
     * changed in the imtr files.
     *
     * We create id's based on the contents of the question and decision
     * by hashing all property-values.
     *
     * @param imtr - The parsed imtr
     */
    (imtr) => {
      // Fix the id's for questions (uitv_[uuid])
      let questionsIdMap: { [key: string]: string } = {};
      const questions = imtr.questions.reduce<JSONQuestion[]>(
        (acc, question) => {
          const { id: originalId, ...rest } = question;

          // Assign id with rest-spread to the question
          const id = getId(rest);
          acc.push({
            ...rest,
            id,
          });

          // Build map for inputs
          questionsIdMap[originalId] = id;
          return acc;
        },
        []
      );

      // Fix the id's for requiredInputs in decisions (_[uuid]).
      let decisionsIdMap: { [key: string]: string } = {};
      const decisionsWithInputs = Object.entries(imtr.decisions)
        .filter(([_, { requiredInputs }]) => !!requiredInputs)
        .reduce<JSONDecisions>((acc, [originalId, decision]) => {
          // Fix the reference to the inputs
          decision.requiredInputs = (decision.requiredInputs as string[]).map(
            (inputId) => questionsIdMap[inputId.replace("#input_", "uitv_")]
          );

          // Fix the id's for decision
          const id = getId(decision);
          acc[id] = decision;

          // Build decisionIdMap for decisions
          decisionsIdMap[originalId] = id;
          return acc;
        }, {});

      // Fix the id's for requiredDecisions in decisions (eg. dummy).
      const decisionsWithDecisions = Object.entries(imtr.decisions)
        .filter(([_, { requiredDecisions }]) => !!requiredDecisions)
        .reduce<JSONDecisions>((acc, [id, decision]) => {
          // Fix the reference to the inputs
          decision.requiredDecisions = (decision.requiredDecisions as string[]).map(
            (originalId) => decisionsIdMap[originalId.replace("#", "")]
          );

          acc[id] = decision;
          return acc;
        }, {});

      return {
        name: imtr.name,
        questions,
        decisions: {
          ...decisionsWithInputs,
          ...decisionsWithDecisions,
        },
      };
    },
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
            let xml, version;
            try {
              let x = (await readJson(
                join(publicDir, outputDir, `${permitId}.json`)
              )) as PermitResponse;
              xml = x.sttr;
              version = x.version;
            } catch (e) {
              console.error(e);
              return;
            }

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

            const jsonText = new TextDecoder().decode(await p.output());

            // apply all reducers to imtr
            try {
              // Run preprocessors on raw json string
              const json = JSON.parse(
                preprocessors.reduce((acc, reducer) => reducer(acc), jsonText)
              );

              await writeJson(parsedPath, json);
              const baseImtr = (await imtrbuild(json)) as JSONPermit;

              // Run preprocessors on raw json string
              const options = {
                permitIndex,
              };
              const imtr = postprocessors.reduce(
                (acc, reducer) => reducer(acc, options),
                baseImtr
              );

              return {
                version,
                ...imtr,
              };
            } catch (e) {
              console.error(`failed to convert json for ${permitId}`);
              throw e;
            }
          })
        ),
        slug,
      };

      writeJson(join(transformedDir, `${slug}.json`), topicJsonContent);
    });
    return topics;
  });

  const permitsJsons = await Promise.all(apisMap);
  writeJson(topicsJsonPath, permitsJsons);
};
