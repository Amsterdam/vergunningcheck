import { renderHook } from "@testing-library/react-hooks";

import {testTopic } from "../utils/test-utils";
import useTopic from "./useTopic";

jest.mock("react-router-dom", () => ({
  useLocation: () => ({
    pathname: `/${"dakkapel-plaatsen"}/go`,
    params: { slug: "dakkapel-plaatsen" },
  }),
}));

describe("useTopic", () => {
  it("returns the topic", () => {
    const { result } = renderHook(() => useTopic());
    expect(result.current).toEqual(testTopic);
  });
});
