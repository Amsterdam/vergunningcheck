import { renderHook } from "@testing-library/react-hooks";
import { Checker } from "@vergunningcheck/imtr-client";

import useChecker from "./useChecker";

jest.mock("react-router-dom", () => ({
  useLocation: () => ({ pathname: "/dakkapel-plaatsen" }),
}));

describe("useChecker", () => {
  it("Can be reset with setChecker", () => {
    const { result } = renderHook(() => useChecker());
    const { checker, setChecker } = result.current;
    expect(checker).toBeInstanceOf(Checker);
    setChecker(undefined);
    expect(checker).toBe(undefined);
  });
});
