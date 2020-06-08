import React from "react";
import { render } from "../utils/test-utils";
import ReactRouter from "react-router-dom";
import withTopic from "./withTopic";

// ReactRouter.useParams = () => {
//   console.log("doe het nu!");
//   return { slug: "baat" };
// };

const { MemoryRouter } = ReactRouter;

// jest.doMock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
//   useParams: () => {
//     return { slug: "with-redirect" };
//   }
// }));

// jest.mock("../config");
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
    // jest.mock("react-router-dom", () => ({
    //   ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
    //   useParams: () => ({ slug: "with-redirect" })
    //   // useRouteMatch: () => ({ url: "/company/company-id1/team/team-id1" })
    // }));
    const WrappedTestPage = withTopic(TestPage);
    const { container } = render(
      <MemoryRouter>
        <WrappedTestPage />
      </MemoryRouter>
    );

    // XXX Check which component is rendered instead of testing the RedirectPage
    expect(container).toHaveTextContent("Wij sturen u automatisch door");
  });

  it("doesn't redirect when needed", () => {
    jest.doMock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
      useParams: () => ({ slug: "without-redirect" }),
      // useRouteMatch: () => ({ url: "/company/company-id1/team/team-id1" })
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
