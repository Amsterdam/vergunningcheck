import React from "react";
import { render } from "../utils/test-utils";
import ReactRouter from "react-router-dom";
import withTopic from "./withTopic";

const { MemoryRouter } = ReactRouter;

require("../config").topics = [
  { slug: "with-redirect", redirectToOlo: true },
  { slug: "without-redirect" },
];

const TestPage = () => <div>some page</div>;

xdescribe("TestPage", () => {
  it("renders text", () => {
    const { container } = render(<TestPage />);
    expect(container).toHaveTextContent("some page");
  });
});

xdescribe("withTopic", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  it("redirects when needed", () => {
    const WrappedTestPage = withTopic(TestPage);
    const { container } = render(
      <MemoryRouter>
        <WrappedTestPage />
      </MemoryRouter>
    );

    // Check which component is rendered instead of testing the RedirectPage
    expect(container).toHaveTextContent("Wij sturen u automatisch door");
  });

  it("doesn't redirect when needed", () => {
    jest.doMock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
      useParams: () => ({ slug: "without-redirect" }),
    }));
    const WrappedTestPage = withTopic(TestPage);
    const { container } = render(
      <MemoryRouter>
        <WrappedTestPage />
      </MemoryRouter>
    );

    expect(container).toHaveTextContent("some page");
  });
});
