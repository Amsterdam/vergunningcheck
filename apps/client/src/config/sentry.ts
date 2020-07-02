import { Integrations } from "@sentry/apm";

type config = {
  dsn: string;
  environment: string;
  integrations: any;
  tracesSampleRate: number;
  release?: string;
};

export const sentryConfig: config = {
  dsn: "https://2996729fb40e46d18b20f85cd57b4dd3@sentry.data.amsterdam.nl/49",
  environment: document.domain,
  integrations: [new Integrations.Tracing()],
  tracesSampleRate: 0.25, // must be present and non-zero
  release: process.env.REACT_APP_VERSION,
};
