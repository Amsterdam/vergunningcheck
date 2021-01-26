import { sentryConfig } from "./sentry";

it("sentryConfig works as expected", () => {
  expect(sentryConfig.release).toBe(process.env.REACT_APP_VERSION);
});
