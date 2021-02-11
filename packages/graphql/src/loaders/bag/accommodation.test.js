require("@spotify/polly-jest-presets");
const { loaderFunctionsTest, teardown } = require("../../testUtils");

const accommodation = require("./accommodation");

const key1 = "0363010000915417";
const key2 = "0363010000782985";

afterAll(teardown);

describe("Accommodation loader", () => {
  describe("Basic functions", loaderFunctionsTest(accommodation, key1, key2));
});
