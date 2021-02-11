require("@spotify/polly-jest-presets");
const situation = require("./situation");
const { loaderFunctionsTest, teardown } = require("../../testUtils");

const key1 = "0363200000242754";
const key2 = "0363200003763479";

afterAll(teardown);

describe("Situation loader", () => {
  describe("Loader internals", loaderFunctionsTest(situation, key1, key2));
});
