import { renderHook } from "@testing-library/react-hooks";

import useSlug from "./useSlug";

jest.mock("react-router-dom", () => ({
  useLocation: () => ({ pathname: "/dakraam-plaatsen" }),
}));

describe("useSlug", () => {
  it("returns a slug when found", () => {
    const { result } = renderHook(() => useSlug());
    expect(result.current).toEqual("dakraam-plaatsen");
  });
});
