import { emptyDir, exists, join } from "./deps.ts";
import type { ActivitiesResponse, APIConfig, TopicInputType } from "./types.ts";
import { writeJson } from "./util.ts";

type Props = {
  config: string;
  dir: string;
  maxConnections: number;
};

const keyName = "STTR_BUILDER_API_KEY";

export default async (argv: Props) => {
  const baseDir = join(Deno.cwd(), argv.dir);
  const publicDir = join(baseDir, "public");
  const key = Deno.env.get(keyName);

  // dir should exist
  if (!(await exists(baseDir))) {
    return new Error(`directory '${baseDir}' not found`);
  }
  if (!(await exists(publicDir))) {
    return new Error(`directory '${baseDir}' should contain a 'public' folder`);
  }

  if (!key) {
    return new Error(`'${keyName}' not found in env`);
  }

  const headers = {
    "x-api-key": escape(key),
  };

  const { apis }: { apis: APIConfig[] } = await import(
    argv.config ? join(Deno.cwd(), argv.config) : "./config.ts"
  );

  const apisMap = apis.map(
    async (api: APIConfig) =>
      new Promise(async (resolve, _) => {
        const { outputDir, host } = api;

        // Create / empty the api-specific output-directory
        await emptyDir(join(publicDir, outputDir));

        /* Fetch api list endpoint and write json to file */
        const activitiesRequest = await fetch(`${host}/activiteiten`, {
          headers,
        });
        const response: ActivitiesResponse = await activitiesRequest.json();
        if (response.error) {
          throw new Error(response.error);
        }
        const activities = response as TopicInputType[];

        writeJson(join(publicDir, outputDir, "list.json"), activities);

        const activityRequests = activities.map(
          async (activity: TopicInputType) => {
            const permitId: string = activity._id;

            const result = await fetch(`${host}/conclusie/sttr`, {
              body: `activiteitId=${permitId}`,
              headers: {
                ...headers,
                "content-type": "application/x-www-form-urlencoded",
              },
              method: "POST",
            });

            if (!result.ok) {
              const text = await result.text();
              throw new Error(
                `request of ${permitId} failed, status: ${result.status} ${result.statusText}. ${text}`
              );
            }

            try {
              writeJson(
                join(publicDir, outputDir, `${permitId}.json`),
                await result.json()
              );
            } catch (e) {
              console.error(e, result);
            }
          }
        );

        await Promise.all(activityRequests);

        resolve(null);
      })
  );

  await Promise.all(apisMap);
};
