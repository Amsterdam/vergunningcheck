import { emptyDir, exists, writeJson } from "https://deno.land/std/fs/mod.ts";
import { join } from "https://deno.land/std/path/mod.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";
import { makeRunWithLimit } from "https://denopkg.com/alextes/run-with-limit/mod.ts";

import { APIConfig, ApiResult } from "./types.d.ts";

const maxAPIConnections = 6; // XXX convert to cli argument

// XXX npm run sttr moet deno aanroepen
// XXX document...
if (Deno.args.length < 2) {
  console.error(`
Dev usage:
$ deno run --unstable --allow-net --allow-write --allow-read fetch.ts BASE_DIR API_KEY --config=config.local.ts (default=config.ts)
`);
  Deno.exit();
}

const baseDir = join(Deno.cwd(), Deno.args[0]);
const headers = {
  "x-api-key": escape(Deno.args[1]),
};
// baseDir should exist
assert(await exists(baseDir));

const { apis }: { apis: APIConfig[] } = await import(
  join(Deno.cwd(), "config.local.ts")
); // XXX convert to cli argument

const apisMap = apis.map(
  async (api: APIConfig) =>
    new Promise(async (resolve, reject) => {
      const { version, outputDir, host } = api;

      // Create / empty the target directory
      await emptyDir(join(baseDir, outputDir));

      /* Fetch api list endpoint and write json to file */
      const request = await fetch(`${host}/activiteiten`, { headers });
      const json = await request.json();
      writeJson(join(baseDir, outputDir, "list.json"), json);

      // Now fetch the permits using a pool of promises
      const { runWithLimit } = makeRunWithLimit(maxAPIConnections);
      const limitedPromiseArray: ApiResult[] = json.map(
        ({ _id: permitId }: any) => {
          // XXX change any to callback???
          console.log("fetch", permitId);

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
