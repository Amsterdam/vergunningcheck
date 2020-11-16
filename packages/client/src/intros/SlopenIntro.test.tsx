import React from "react";

import text from "../i18n/nl";
import { render, screen } from "../utils/test-utils";
import SlopenIntro from "./SlopenIntro";

jest.mock("react-router-dom", () => ({
  useParams: () => ({}),
}));

xit("SopenIntro renders correctly", () => {
  render(
    <SlopenIntro
      introSentence={text.translation.introPage.slopen["need report"]}
      showContactInformation={false}
      usableForText={text.translation.introPage.slopen["intro description"]}
    />
  );

  expect(
    screen.queryByText(text.translation.introPage.slopen["intro description"], {
      exact: false,
    })
  ).toBeInTheDocument();
});
