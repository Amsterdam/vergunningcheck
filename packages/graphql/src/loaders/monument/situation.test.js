const uuid = require("uuid");
const situation = require("rewire")("./situation.js");
const loader = situation.__get__("loader");

const load = jest.fn(
  (id) => new Promise((resolve) => resolve(`data for ${id}`))
);

// Setup mock
situation.__set__(
  "loader",
  Object.assign({}, loader, {
    load,
  })
);

describe("Situation loader", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });
  test("load function", async () => {
    const key = uuid();
    const result = await Promise.all(await situation.load([key]));
    expect(result).toStrictEqual([`data for ${key}`]);
  });

  test("cache hit", async () => {
    const key = uuid();
    const a = await Promise.all(await situation.load([key]));
    const b = await Promise.all(await situation.load([key]));
    expect(a).toStrictEqual(b);
    expect(load.mock.calls.length).toBe(1);
  });

  test("cache miss", async () => {
    const a = await Promise.all(await situation.load([uuid()]));
    const b = await Promise.all(await situation.load([uuid()]));
    expect(load.mock.calls.length).toBe(2);
    expect(a).not.toStrictEqual(b);
  });
});
