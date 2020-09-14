import { emptyDir, exists, writeJson } from "https://deno.land/std/fs/mod.ts";
import { join } from "https://deno.land/std/path/mod.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";
import parser from "https://deno.land/x/yargs_parser/deno.ts";
import { makeRunWithLimit } from "https://denopkg.com/alextes/run-with-limit/mod.ts";

import { APIConfig, ActivitiesResponse, TopicInputType } from "./types.ts";

// TODO: Improve 'usage', waiting for yargs to be ported https://github.com/yargs/yargs/issues/1661
const argv = parser(Deno.args, {
  number: ["max-connections"],
  string: ["dir", "key", "config"],
});

if (!argv.dir) {
  console.error(`
Usage:
$ deno run --unstable --allow-net --allow-read --allow-write fetch.ts --dir=path/to/sttr [--config=config.ts --key=API_KEY --max-connections=6]
`);
  Deno.exit();
}

const baseDir = join(Deno.cwd(), argv.dir);
const headers = {
  "x-api-key": escape(argv.key),
};

// baseDir should exist
assert(await exists(baseDir));

const { apis }: { apis: APIConfig[] } = await import(
  argv.config ? join(Deno.cwd(), argv.config) : "./config.ts"
);

const apisMap = apis.map(
  async (api: APIConfig) =>
    new Promise(async (resolve, _) => {
      const { outputDir, host } = api;

      // Create / empty the api-specific output-directory
      await emptyDir(join(baseDir, outputDir));

      /* Fetch api list endpoint and write json to file */
      const activitiesRequest = await fetch(`${host}/activiteiten`, {
        headers,
      });
      const response: ActivitiesResponse = await activitiesRequest.json();
      if (response.error) {
        throw new Error(response.error);
      }
      const activities = response as TopicInputType[];

      writeJson(join(baseDir, outputDir, "list.json"), activities);

      // Now fetch the permits using a pool of promises
      const { runWithLimit } = makeRunWithLimit(argv.maxConnections || 6);
      const activityRequests = activities.map((activity: TopicInputType) => {
        const permitId: string = activity._id;

        const requestPromise = async () => {
          const result = await fetch(`${host}/conclusie/sttr`, {
            body: `activiteitId=${permitId}`,
            headers: {
              ...headers,
              "content-type": "application/x-www-form-urlencoded",
            },
            method: "POST",
          });

          if (!result.ok) {
            throw new Error(
              `request of ${permitId} failed, status: ${result.status} ${result.statusText}`
            );
          }

          try {
            writeJson(
              join(baseDir, outputDir, `${permitId}.json`),
              await result.json()
            );
          } catch (e) {
            console.error(e, result);
          }
        };
        return runWithLimit(requestPromise);
      });

      await Promise.all(activityRequests);

      resolve();
    })
);

await Promise.all(apisMap);
