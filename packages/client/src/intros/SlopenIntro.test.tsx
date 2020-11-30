import React from "react";

import { render, screen } from "../utils/test-utils";
import SlopenIntro from "./SlopenIntro";

jest.mock("react-router-dom", () => ({
  useParams: () => ({}),
}));

const sentence1 = `U hebt misschien een omgevingsvergunning nodig. Het kan ook zijn dat u de sloop moet melden. Met deze vergunningcheck kunt u zien wat u moet doen.`;
const sentence2 = `Soms staat in het bestemmingsplan dat een vergunning nodig is. Deze vergunningcheck kijkt niet naar bestemmingsplannen. Nadat u alle vragen hebt beantwoord, leest u hoe u dat zelf kunt bekijken.`;

it("SlopenIntro renders correctly", () => {
  render(<SlopenIntro />);

  expect(
    screen.queryByText(sentence1, {
      exact: false,
    })
  ).toBeInTheDocument();
  expect(
    screen.queryByText(sentence2, {
      exact: false,
    })
  ).toBeInTheDocument();
});
