import { emptyDir, writeJson } from "https://deno.land/std/fs/mod.ts";
import { join } from "https://deno.land/std/path/mod.ts";
import parser from "https://deno.land/x/yargs_parser/deno.ts";
import { makeRunWithLimit } from "https://denopkg.com/alextes/run-with-limit/mod.ts";

import { APIConfig, ApiResult } from "./types.ts";

// TODO: Improve 'usage', waiting for yargs to be ported https://github.com/yargs/yargs/issues/1661
const argv = parser(Deno.args, {
  string: ["dir"],
  number: ["max-connections"],
});

if (!argv.dir) {
  console.error(`
Usage:
$ deno run --unstable --allow-net --allow-read --allow-write fetchimages.ts --config=config.ts --dir=path/to/sttr [--max-connections=6]
`);
  Deno.exit();
}

const baseDir = join(Deno.cwd(), argv.dir);

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
      const activitiesRequest = await fetch(`${host}/activiteiten`);
      const activities = await activitiesRequest.json();
      if (activities.error) {
        throw new Error(activities.error);
      }

      writeJson(join(baseDir, outputDir, "manifest.json"), activities);

      // Now fetch the permits using a pool of promises
      const { runWithLimit } = makeRunWithLimit(argv.maxConnections || 6);
      const activityRequests: ApiResult[] = activities.map((activity) => {
        const permitId: string = activity._id;

        return runWithLimit(async () => {
          const result = await fetch(`....`);
          if (!result.ok) {
            console.error(
              `request of ${permitId} failed, status: ${result.status} ${result.statusText}`
            );
          }
        });
      });

      await Promise.all(activityRequests);

      resolve();
    })
);

await Promise.all(apisMap);
