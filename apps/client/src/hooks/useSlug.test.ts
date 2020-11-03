import { renderHook } from "@testing-library/react-hooks";

import useSlug from "./useSlug";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: `/${"dakkapel-plaatsen"}/go`,
    params: { slug: "dakkapel-plaatsen" },
  }),
}));

describe("useSlug", () => {
  it("returns a slug when found", () => {
    const { result } = renderHook(() => useSlug());
    expect(result.current).toEqual("dakkapel-plaatsen");
  });
});
