import { getChecker } from "@vergunningcheck/imtr-client";

import { addQuotes } from "../../../imtr-client/src/utils/index";
import mockedChecker2 from "../__mocks__/checker-bouwwerk-slopen-mock.json";
import mockedChecker1 from "../__mocks__/checker-dakkapel-plaatsen-mock.json";
import nl from "../i18n/nl";
import getOutcomeContent from "./getOutcomeContent";

describe("getOutcomeContent", () => {
  it("renders the default permitFree outcome", () => {
    const checker = getChecker(mockedChecker1);
    const mockedSlug = "dakkapel-plaatsen";
    const { title } = getOutcomeContent(checker, mockedSlug);
    expect(title).toMatch(
      nl.translation.outcome.permitFree["you dont need a permit"]
    );
  });

  it("renders the default needContact content", () => {
    const checker = getChecker(mockedChecker1);

    // Answer checker in a way to get the needContact outcome
    checker.next();
    const answers = mockedChecker1.permits[1].questions[2].options as string[];
    checker.stack[0].setAnswer(addQuotes(answers[0]));
    checker.next();
    checker.stack[1].setAnswer(false);
    checker.next();

    const mockedSlug = "dakkapel-plaatsen";
    const { title } = getOutcomeContent(checker, mockedSlug);
    expect(title).toMatch(
      nl.translation.outcome.needContact["you need to contact the city"]
    );
  });

  it("renders the alternative permitFree content for demolition", () => {
    const mockedSlug = "bouwwerk-slopen";
    const { title } = getOutcomeContent(getChecker(mockedChecker2), mockedSlug);
    expect(title).toMatch(
      nl.translation.outcome.permitFree["you dont need a permit for demolition"]
    );
  });

  it("renders the alternative permitFree content for firesafelty", () => {
    const mockedSlug = "brandveilig-gebruik";
    const { title } = getOutcomeContent(getChecker(mockedChecker2), mockedSlug);
    expect(title).toMatch(
      nl.translation.outcome.permitFree[
        "you dont need a permit and dont need to report"
      ]
    );
  });
});
