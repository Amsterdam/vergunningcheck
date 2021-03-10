import React from "react";

import text from "../../i18n/nl";
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
      screen.getByText(
        text.translation.introPage.common[
          "situation dependent on both situation and questions"
        ],
        {
          exact: false,
        }
      );
      screen.getByText(text.translation.introPage.common["change answer"], {
        exact: false,
      });
    });

    it("supports situation only", () => {
      render(<Intro dependantOnQuestions={false} />);
      screen.getByText(
        text.translation.introPage.common[
          "situation dependent on situation only"
        ]
      );
      expect(
        screen.queryByText(text.translation.introPage.common["change answer"], {
          exact: false,
        })
      ).not.toBeInTheDocument();
    });

    it("supports questions only", () => {
      render(<Intro dependantOnSituation={false} />);
      screen.queryByText(
        text.translation.introPage.common[
          "situation dependent on questions only"
        ],
        {
          exact: false,
        }
      );
      screen.getByText(text.translation.introPage.common["change answer"], {
        exact: false,
      });
    });

    it("supports no questions and no situation too", () => {
      render(
        <Intro dependantOnSituation={false} dependantOnQuestions={false} />
      );
      expect(
        screen.queryByText(text.translation.introPage.common["change answer"])
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId(INTRO_USER_INFLUENCE)
      ).not.toBeInTheDocument();
    });

    describe("usableForBullets", () => {
      it("renders no extra sentence", () => {
        render(<Intro />);
        expect(
          screen.queryByText(text.translation.introPage.common["permit for"])
        ).toBeNull();
      });

      it("renders extra sentence with colon (:)", () => {
        render(<Intro usableForBullets={["x", "y"]} />);
        expect(
          screen.queryByText(
            `${text.translation.introPage.common["check for permit intro"]} ${text.translation.introPage.common["permit for"]}`
          )
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
        expect(
          screen.queryByText(
            text.translation.introPage.common["exceptions title"]
          )
        ).not.toBeInTheDocument();
      });

      it("renders extra sentence with colon (:)", () => {
        render(<Intro exceptions={["x"]} />);
        screen.getByText(text.translation.introPage.common["exceptions title"]);
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
        render(<Intro showContactInformation />);
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
