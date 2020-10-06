import React from "react";

import { INTRO_USER_INFLUENCE } from "../../utils/test-ids";
import { render } from "../../utils/test-utils";
import DynamicIMTRIntro from "./DynamicIMTRIntro";

const notNull = {};

// @TODO move this to a mocks folder
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({}),
}));

describe("<DynamicIMTRIntro />", () => {
  it("can depend on questions but not situation", () => {
    const { getByText } = render(
      <DynamicIMTRIntro
        checker={{
          _getUpcomingQuestions: () => [notNull],
          getAutofillDataNeeds: () => [],
        }}
      />
    );
    getByText(/Uw antwoorden bepalen/);
  });
  it("can depend on question and situation", () => {
    const { getByText } = render(
      <DynamicIMTRIntro
        checker={{
          _getUpcomingQuestions: () => [notNull],
          getAutofillDataNeeds: () => [notNull],
        }}
      />
    );
    getByText(/Uw situatie en uw antwoorden bepalen/);
  });
  it("can depend on situation and no questions", () => {
    const { getByText } = render(
      <DynamicIMTRIntro
        checker={{
          _getUpcomingQuestions: () => [],
          getAutofillDataNeeds: () => [notNull],
        }}
      />
    );
    getByText(/Uw situatie bepaalt/);
  });
  it("can depend on neither situation or questions", () => {
    const { queryByTestId } = render(
      <DynamicIMTRIntro
        checker={{
          _getUpcomingQuestions: () => [],
          getAutofillDataNeeds: () => [],
        }}
      />
    );
    expect(queryByTestId(INTRO_USER_INFLUENCE)).not.toBeInTheDocument();
  });
});
