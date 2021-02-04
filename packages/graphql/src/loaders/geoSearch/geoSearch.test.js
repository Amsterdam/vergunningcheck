require("@spotify/polly-jest-presets");
const { loaderFunctionsTest, teardown } = require("../../testUtils");
const geoSearch = require(".");

const key1 = "121613 487990";
const key2 = "121263 484745";

afterAll(teardown);

describe("GeoSearch loader", () => {
  describe("Basic functions", loaderFunctionsTest(geoSearch, key1, key2));
});
