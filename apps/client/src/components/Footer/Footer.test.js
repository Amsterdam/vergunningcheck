import React from "react";
import { MemoryRouter } from "react-router-dom";

import Context from "../../__mocks__/context";
import matchMedia from "../../__mocks__/matchMedia";
import { topics } from "../../config";
import { FOOTER } from "../../utils/test-ids";
import { render } from "../../utils/test-utils";
import Footer from ".";

Object.defineProperty(window, "matchMedia", matchMedia);

const Wrapper = ({ children }) => {
  const topicMock = "dakraam-plaatsen";
  const topicUrlMock = `/${topicMock}`;
  const topic = topics.find((t) => t.slug === topicMock);

  return (
    <Context topicMock={topic}>
      <MemoryRouter initialEntries={[topicUrlMock]}>{children}</MemoryRouter>
    </Context>
  );
};

it("renders with text", () => {
  const { getByTestId } = render(
    <Wrapper>
      <Footer />
    </Wrapper>
  );
  expect(getByTestId(FOOTER)).toBeTruthy();
});
