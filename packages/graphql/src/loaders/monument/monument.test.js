const uuid = require("uuid");
const monument = require("rewire")("./monument.js");
const loader = monument.__get__("loader");

const load = jest.fn(
  (id) => new Promise((resolve) => resolve(`data for ${id}`))
);

// Setup mock
monument.__set__(
  "loader",
  Object.assign({}, loader, {
    load,
  })
);

describe("Monument loader", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });
  test("load function", async () => {
    const key = uuid();
    const result = await Promise.all(await monument.load([key]));
    expect(result).toStrictEqual([`data for ${key}`]);
  });

  test("cache hit", async () => {
    const key = uuid();
    const a = await Promise.all(await monument.load([key]));
    const b = await Promise.all(await monument.load([key]));
    expect(a).toStrictEqual(b);
    expect(load.mock.calls.length).toBe(1);
  });

  test("cache miss", async () => {
    const a = await Promise.all(await monument.load([uuid()]));
    const b = await Promise.all(await monument.load([uuid()]));
    expect(load.mock.calls.length).toBe(2);
    expect(a).not.toStrictEqual(b);
  });
});
