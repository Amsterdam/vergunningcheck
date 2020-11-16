import React from "react";
import { INTRO_USER_INFLUENCE } from "../../utils/test-ids";
import { render } from "../../utils/test-utils";
import DynamicIMTRIntro from "./DynamicIMTRIntro";
import {useChecker} from "../../hooks";

// @TODO move this to a mocks folder
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({}),
}));

jest.mock("../../hooks/useChecker");

describe("<DynamicIMTRIntro />", () => {
  it("can depend on questions but not situation", () => {
    useChecker.mockReturnValue({
      checker: {
        _getUpcomingQuestions: () => [{}],
        getAutofillDataNeeds: () => [],
      } as any
    });
    const { getByText } = render(<DynamicIMTRIntro />);
    getByText(/Uw antwoorden bepalen/);
  });
  it("can depend on question and situation", () => {
    useChecker.mockReturnValue({
      checker: {
        _getUpcomingQuestions: () => [{}],
        getAutofillDataNeeds: () => [{}],
      } as any
    });
    const { getByText } = render(<DynamicIMTRIntro />);
    getByText(/Uw situatie en uw antwoorden bepalen/);
  });
  it("can depend on situation and no questions", () => {
    useChecker.mockReturnValue({
      checker: {
        _getUpcomingQuestions: () => [],
        getAutofillDataNeeds: () => [{}],
      } as any
    });
    const { getByText } = render(<DynamicIMTRIntro />);
    getByText(/Uw situatie bepaalt/);
  });
  it("can depend on neither situation or questions", () => {
    useChecker.mockReturnValue({
      checker: {
        _getUpcomingQuestions: () => [],
        getAutofillDataNeeds: () => [],
      } as any
    });
    const { queryByTestId } = render(<DynamicIMTRIntro />);
    expect(queryByTestId(INTRO_USER_INFLUENCE)).not.toBeInTheDocument();
  });
});
