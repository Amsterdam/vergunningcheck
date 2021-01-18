import "@testing-library/jest-dom/extend-expect";

import React from "react";

import { render } from "../utils/test-utils";
import AutoSuggestList from "./AutoSuggestList";

describe("AutoSuggestList", () => {
  it("renders correctly without options", async () => {
    let handleSelect = jest.fn();

    const { container } = render(
      <AutoSuggestList
        activeIndex={-1}
        options={[]}
        role="select"
        onSelectOption={handleSelect}
      />
    );

    expect(container.firstChild).toBeNull();
  });
});
