const { resolvers } = require('.');
const topic = require('./__mocks__/topic.json');
const loader = require('../../loaders/manager');

describe("topics module", () => {
  test("reducer and checkerJSON", async () => {
    const reduced = loader.reducer(topic);
    const result = await resolvers.Topic.checkerJSON(reduced);
    expect(result).toMatchSnapshot()
  });
});