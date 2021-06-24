require("@spotify/polly-jest-presets");
const manager = require(".");
const mock = require("./__mocks__/dakkapel-plaatsen.json");

const key1 = "dakkapel-plaatsen";
const key2 = "bouwwerk-slopen";

describe("manager loader", () => {
  test("manager result", async () => {
    const a = await Promise.all(await manager.load([key1]));
    const b = await Promise.all(await manager.load([key2]));

    expect(a).toMatchSnapshot();
    expect(b).toMatchSnapshot();
  });

  test("list", async () => {
    expect(manager.list()).toMatchSnapshot();
  });

  test("reducer", async () => {
    expect(manager.reducer(mock)).toMatchSnapshot();
  });
});
