import { emptyDir, exists, writeJson } from "https://deno.land/std/fs/mod.ts";
import { join } from "https://deno.land/std/path/mod.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";
import parser from "https://deno.land/x/yargs_parser/deno.ts";
import { makeRunWithLimit } from "https://denopkg.com/alextes/run-with-limit/mod.ts";

import { APIConfig, ApiResult } from "./types.d.ts";

// TODO: Improve 'usage', waiting for yargs to be ported https://github.com/yargs/yargs/issues/1661
const argv = parser(Deno.args, {
  string: ["dir", "key", "config"],
  number: ["max-connections"],
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
      const { version, outputDir, host } = api;

      // Create / empty the api-specific output-directory
      await emptyDir(join(baseDir, outputDir));

      /* Fetch api list endpoint and write json to file */
      const request = await fetch(`${host}/activiteiten`, { headers });
      const json = await request.json();
      if (json.error) {
        throw new Error(json.error);
      }

      writeJson(join(baseDir, outputDir, "list.source.json"), json);

      // Now fetch the permits using a pool of promises
      const { runWithLimit } = makeRunWithLimit(argv.maxConnections || 6);
      const limitedPromiseArray: ApiResult[] = json.map(
        ({ _id: permitId }: any) => {
          // XXX change any to callback???
          // console.log("fetch", permitId);

          const requestPromise = async (): Promise<ApiResult> => {
            const result = await fetch(`${host}/conclusie/sttr`, {
              method: "POST",
              body: `activiteitId=${permitId}`,
              headers: {
                ...headers,
                "content-type": "application/x-www-form-urlencoded",
              },
            });

            if (!result.ok) {
              console.error(
                `request of ${permitId} failed, status: ${result.status} ${result.statusText}`
              );
            }

            if (version === 1) {
              Deno.writeTextFile(
                join(baseDir, outputDir, `${permitId}.xml`),
                await result.text()
              );
            } else {
              writeJson(
                join(baseDir, outputDir, `${permitId}.source.json`),
                await result.json()
              );
            }
          };
          return runWithLimit(requestPromise);
        }
      );

      await Promise.all(limitedPromiseArray);

      resolve();
    })
);

await Promise.all(apisMap);
