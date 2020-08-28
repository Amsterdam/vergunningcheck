import React from "react";

import {
  INTRO_EXCEPTION_BULLETS,
  INTRO_USABLE_FOR_BULLETS,
  INTRO_USABLE_FOR_TEXT,
  INTRO_USER_INFLUENCE,
  PHONE_NUMBER,
} from "../../utils/test-ids";
import { render } from "../../utils/test-utils";
import Intro from "./Intro";

describe("<Intro />", () => {
  it("always renders welcome sentence", () => {
    const { getByText } = render(<Intro />);
    getByText(
      /Met de vergunningcheck kunt u zien wanneer u een omgevingsvergunning nodig hebt\./
    );
  });

  describe("User influence on result", () => {
    it("supports situation and answers", () => {
      const { getByText } = render(<Intro />);
      getByText(/Uw situatie en uw antwoorden bepalen/);
      getByText(/U kunt een antwoord wijzigen\. Zo kunt u zien/);
    });

    it("supports situation only", () => {
      const { queryByText, getByText } = render(
        <Intro dependantOnQuestions={false} />
      );
      getByText(/Uw situatie bepaalt/);
      expect(
        queryByText(/U kunt een antwoord wijzigen\. Zo kunt u zien/)
      ).not.toBeInTheDocument();
    });

    it("supports questions only", () => {
      const { getByText } = render(<Intro dependantOnSituation={false} />);
      getByText(/Uw antwoorden bepalen/);
      getByText(/U kunt een antwoord wijzigen\. Zo kunt u zien/);
    });

    it("supports no questions and no situation too", () => {
      const { queryByTestId, queryByText } = render(
        <Intro dependantOnSituation={false} dependantOnQuestions={false} />
      );
      expect(
        queryByText(/U kunt een antwoord wijzigen\. Zo kunt u zien/)
      ).not.toBeInTheDocument();
      expect(queryByTestId(INTRO_USER_INFLUENCE)).not.toBeInTheDocument();
    });

    describe("usableForBullets", () => {
      it("renders no extra sentence", () => {
        const { queryByText } = render(<Intro />);
        expect(
          queryByText(/U kunt een vergunning nodig hebben voor:/)
        ).toBeNull();
      });

      it("renders extra sentence with colon (:)", () => {
        const { queryByText } = render(<Intro usableForBullets={["x"]} />);
        expect(
          queryByText(/ U kunt een vergunning nodig hebben voor:/)
        ).toBeInTheDocument();
      });

      it("shows the bullets", () => {
        const { getByTestId, getByText } = render(
          <Intro
            usableForBullets={["monument permit", "something-else permit"]}
          />
        );
        expect(getByTestId(INTRO_USABLE_FOR_BULLETS).children).toHaveLength(2);
        getByText(/monument permit/);
        getByText(/something-else permit/);
      });
    });

    describe("usableForText", () => {
      it("doesn't render if not provided", () => {
        const { queryByTestId } = render(<Intro />);
        expect(queryByTestId(INTRO_USABLE_FOR_TEXT)).not.toBeInTheDocument();
      });

      it("renders extra sentence, if set", () => {
        const { queryByText } = render(
          <Intro usableForText="you can use this" />
        );
        queryByText(/you can use this/);
      });
    });

    describe("exceptions", () => {
      it("doesn't render extra sentence", () => {
        const { queryByText } = render(<Intro />);
        expect(queryByText(/Uitzonderingen/)).not.toBeInTheDocument();
      });

      it("renders extra sentence with colon (:)", () => {
        const { getByText } = render(<Intro exceptions={["x"]} />);
        getByText(/Uitzonderingen:/);
      });

      it("renders the actual exceptions in a list", () => {
        const { getByText, getByTestId } = render(
          <Intro exceptions={["cant x", "cant y"]} />
        );

        expect(getByTestId(INTRO_EXCEPTION_BULLETS).children).toHaveLength(2);
        getByText(/cant x/);
        getByText(/cant y/);
      });
    });
    describe("showContactInformation", () => {
      it("should render by default (without exceptions)", () => {
        const { getByTestId } = render(<Intro />);
        getByTestId(PHONE_NUMBER);
      });

      it("should render by default (with exceptions)", () => {
        const { getByTestId } = render(<Intro exceptions={["bla"]} />);
        getByTestId(PHONE_NUMBER);
      });

      it("can be skipped in combination without exceptions", () => {
        const { queryByTestId } = render(
          <Intro showContactInformation={false} />
        );
        expect(queryByTestId(PHONE_NUMBER)).not.toBeInTheDocument();
      });

      it("can be skipped in combination with exceptions", () => {
        const { queryByTestId } = render(
          <Intro exceptions={["bla"]} showContactInformation={false} />
        );
        expect(queryByTestId(PHONE_NUMBER)).not.toBeInTheDocument();
      });
    });
  });
});
