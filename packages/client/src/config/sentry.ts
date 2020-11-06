type config = {
  dsn: string;
  environment: string;
  release?: string;
};

export const sentryConfig: config = {
  dsn: "https://2996729fb40e46d18b20f85cd57b4dd3@sentry.data.amsterdam.nl/49",
  environment: document.domain,
  release: process.env.REACT_APP_VERSION,
};
