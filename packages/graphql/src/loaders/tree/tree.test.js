require("@spotify/polly-jest-presets");
const db = require("../../database");

const tree = require(".");

tree.search = jest.fn(tree.search);
tree.fetch = jest.fn(tree.fetch);
tree.reducer = jest.fn(tree.reducer);

const id1 =
  "G0363.2822a91bbdd840e48086103228f55f08~20051223175652~20160503164617";
const id2 =
  "G0363.376d57e9f24649db8d2a03ff996c2c1d~20051223175629~20160503164617";

afterAll(() => {
  db.close();
});

describe("Tree loader", () => {
  test("tree.reducer", async () => {
    expect(
      tree.reducer({
        id: "123abc",
        nonsupported: "gone",
        geometry:
          '{"type":"Point", "coordinates":[52.3707669432068,4.90550562949144]}',
      })
    ).toMatchObject({
      id: "123abc",
      geometry: {
        type: "Point",
        coordinates: [52.3707669432068, 4.90550562949144],
      },
    });
  });

  test("tree.search", async () => {
    const geoJson = {
      type: "Polygon",
      coordinates: [
        [
          [4.903454, 52.370005],
          [4.905888, 52.370005],
          [4.905888, 52.370821],
        ],
      ],
    };
    expect(await tree.search(geoJson)).toMatchSnapshot();
  });

  describe("tree.fetch", () => {
    test("single fetch", async () =>
      expect(await tree.fetch([id1])).toMatchSnapshot());

    test("multi-fetch", async () =>
      expect(await tree.fetch([id1, id2])).toMatchSnapshot());
  });
});
