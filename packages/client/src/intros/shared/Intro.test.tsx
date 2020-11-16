import React from "react";

import {
  INTRO_EXCEPTION_BULLETS,
  INTRO_USABLE_FOR_BULLETS,
  INTRO_USABLE_FOR_TEXT,
  INTRO_USER_INFLUENCE,
  PHONE_NUMBER,
} from "../../utils/test-ids";
import { render, screen } from "../../utils/test-utils";
import Intro from "./Intro";

jest.mock("react-router-dom", () => ({
  useParams: () => ({}),
}));

describe("<Intro />", () => {
  it("renders intro sentence", () => {
    render(<Intro introSentence="introSentence" />);
    expect(screen.getByText(/introSentence/)).toBeInTheDocument();
  });

  describe("User influence on result", () => {
    it("supports situation and answers", () => {
      render(<Intro />);
      screen.getByText(/Uw situatie en uw antwoorden bepalen/);
      screen.getByText(/U kunt een antwoord wijzigen\. Zo kunt u zien/);
    });

    it("supports situation only", () => {
      render(<Intro dependantOnQuestions={false} />);
      screen.getByText(/Uw situatie bepaalt/);
      expect(
        screen.queryByText(/U kunt een antwoord wijzigen\. Zo kunt u zien/)
      ).not.toBeInTheDocument();
    });

    it("supports questions only", () => {
      render(<Intro dependantOnSituation={false} />);
      screen.getByText(/Uw antwoorden bepalen/);
      screen.getByText(/U kunt een antwoord wijzigen\. Zo kunt u zien/);
    });

    it("supports no questions and no situation too", () => {
      render(
        <Intro dependantOnSituation={false} dependantOnQuestions={false} />
      );
      expect(
        screen.queryByText(/U kunt een antwoord wijzigen\. Zo kunt u zien/)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId(INTRO_USER_INFLUENCE)
      ).not.toBeInTheDocument();
    });

    describe("usableForBullets", () => {
      it("renders no extra sentence", () => {
        render(<Intro />);
        expect(
          screen.queryByText(/U kunt een vergunning nodig hebben voor:/)
        ).toBeNull();
      });

      it("renders extra sentence with colon (:)", () => {
        render(<Intro usableForBullets={["x", "y"]} />);
        expect(
          screen.queryByText(/ U kunt een vergunning nodig hebben voor:/)
        ).toBeInTheDocument();
      });

      it("shows the bullets", () => {
        render(
          <Intro
            usableForBullets={["monument permit", "something-else permit"]}
          />
        );
        expect(
          screen.getByTestId(INTRO_USABLE_FOR_BULLETS).children
        ).toHaveLength(2);
        screen.getByText(/monument permit/);
        screen.getByText(/something-else permit/);
      });
    });

    describe("usableForText", () => {
      it("doesn't render if not provided", () => {
        render(<Intro />);
        expect(
          screen.queryByTestId(INTRO_USABLE_FOR_TEXT)
        ).not.toBeInTheDocument();
      });

      it("renders extra sentence, if set", () => {
        render(<Intro usableForText="you can use this" />);
        screen.queryByText(/you can use this/);
      });
    });

    describe("exceptions", () => {
      it("doesn't render extra sentence", () => {
        render(<Intro />);
        expect(screen.queryByText(/Uitzonderingen/)).not.toBeInTheDocument();
      });

      it("renders extra sentence with colon (:)", () => {
        render(<Intro exceptions={["x"]} />);
        screen.getByText(/Uitzonderingen:/);
      });

      it("renders the actual exceptions in a list", () => {
        render(<Intro exceptions={["cant x", "cant y"]} />);

        expect(
          screen.getByTestId(INTRO_EXCEPTION_BULLETS).children
        ).toHaveLength(2);
        screen.getByText(/cant x/);
        screen.getByText(/cant y/);
      });
    });
    describe("showContactInformation", () => {
      it("should render by default (without exceptions)", () => {
        render(<Intro />);
        screen.getByTestId(PHONE_NUMBER);
      });

      it("should render by default (with exceptions)", () => {
        render(<Intro exceptions={["bla"]} />);
        screen.getByTestId(PHONE_NUMBER);
      });

      it("can be skipped in combination without exceptions", () => {
        render(<Intro showContactInformation={false} />);
        expect(screen.queryByTestId(PHONE_NUMBER)).not.toBeInTheDocument();
      });

      it("can be skipped in combination with exceptions", () => {
        render(<Intro exceptions={["bla"]} showContactInformation={false} />);
        expect(screen.queryByTestId(PHONE_NUMBER)).not.toBeInTheDocument();
      });
    });
  });
});
