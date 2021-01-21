import "@testing-library/jest-dom/extend-expect";

import React from "react";

import { AUTOSUGGEST_ITEM, AUTOSUGGEST_LIST } from "../utils/test-ids";
import { fireEvent, render, screen } from "../utils/test-utils";
import AutoSuggestList from "./AutoSuggestList";

describe("AutoSuggestList", () => {
  it("should render correctly without options", async () => {
    const handleSelect = jest.fn();

    const { container } = render(
      <AutoSuggestList
        activeIndex={-1}
        options={[]}
        role="select"
        onSelectOption={handleSelect}
      />
    );

    expect(container.firstChild).toBeNull();
    expect(screen.queryByTestId(AUTOSUGGEST_LIST)).toBeNull();
  });

  it("should render correctly with options", async () => {
    const handleSelect = jest.fn();

    render(
      <AutoSuggestList
        activeIndex={-1}
        options={[
          { id: 1, value: "one" },
          { id: 2, value: "two" },
        ]}
        role="select"
        onSelectOption={handleSelect}
      />
    );

    expect(screen.getByTestId(AUTOSUGGEST_LIST)).toBeInTheDocument();
    expect(screen.getAllByTestId(AUTOSUGGEST_ITEM).length).toBe(2);
  });

  it("should not select with arrow keys", () => {
    const handleSelect = jest.fn();

    render(
      <AutoSuggestList
        activeIndex={-1}
        options={[
          { id: 1, value: "one" },
          { id: 2, value: "two" },
        ]}
        role="select"
        onSelectOption={handleSelect}
      />
    );

    // two suggesions must be rendered without focus
    expect(screen.getByTestId(AUTOSUGGEST_LIST)).toBeInTheDocument();
    const listItems = screen.getAllByTestId(AUTOSUGGEST_ITEM);
    expect(listItems.length).toBe(2);
    expect(listItems[0]).not.toHaveFocus();
    expect(listItems[1]).not.toHaveFocus();

    //try navigating with keyboard
    fireEvent.keyDown(listItems[0], { key: "ArrowUp" });
    fireEvent.keyDown(listItems[0], { key: "ArrowDown" });

    // simulate other keyboard events
    fireEvent.keyDown(listItems[0], { key: "A" });
    fireEvent.keyDown(listItems[0], { key: "a" });

    // for IE
    fireEvent.keyDown(listItems[0], { key: "Up" });
    fireEvent.keyDown(listItems[0], { key: "Down" });

    // selection was not updated
    expect(handleSelect).not.toHaveBeenCalled();
    expect(listItems[0]).not.toHaveFocus();
    expect(listItems[1]).not.toHaveFocus();
  });

  it("should select with enter key", () => {
    let activeIndex = -1;
    const handleSelect = jest.fn((option) => {
      activeIndex = option.id;
    });

    const { rerender } = render(
      <AutoSuggestList
        activeIndex={activeIndex}
        options={[
          { id: 0, value: "zero" },
          { id: 1, value: "one" },
        ]}
        role="select"
        onSelectOption={handleSelect}
      />
    );

    expect(screen.getByTestId(AUTOSUGGEST_LIST)).toBeInTheDocument();
    const listItems = screen.getAllByTestId(AUTOSUGGEST_ITEM);
    expect(listItems.length).toBe(2);
    expect(listItems[0]).not.toHaveFocus();
    expect(listItems[1]).not.toHaveFocus();

    fireEvent.keyDown(listItems[0], { key: "ArrowDown" });
    fireEvent.keyDown(listItems[1], { key: "Enter" });

    rerender(
      <AutoSuggestList
        activeIndex={activeIndex}
        options={[
          { id: 0, value: "zero" },
          { id: 1, value: "one" },
        ]}
        role="select"
        onSelectOption={handleSelect}
      />
    );

    expect(listItems[0]).not.toHaveFocus();
    expect(listItems[1]).toHaveFocus();
    expect(handleSelect).toHaveBeenCalled();
    expect(handleSelect).toHaveBeenLastCalledWith({ id: 1, value: "one" });
  });

  it("should select with mouse click", () => {
    let activeIndex = -1;
    const handleSelect = jest.fn((option) => {
      activeIndex = option.id;
    });

    const { rerender } = render(
      <AutoSuggestList
        activeIndex={activeIndex}
        options={[
          { id: 0, value: "zero" },
          { id: 1, value: "one" },
        ]}
        role="select"
        onSelectOption={handleSelect}
      />
    );

    expect(screen.getByTestId(AUTOSUGGEST_LIST)).toBeInTheDocument();
    const listItems = screen.getAllByTestId(AUTOSUGGEST_ITEM);
    expect(listItems.length).toBe(2);
    expect(listItems[0]).not.toHaveFocus();
    expect(listItems[1]).not.toHaveFocus();

    fireEvent.mouseDown(listItems[1], { button: 0 });

    rerender(
      <AutoSuggestList
        activeIndex={activeIndex}
        options={[
          { id: 0, value: "zero" },
          { id: 1, value: "one" },
        ]}
        role="select"
        onSelectOption={handleSelect}
      />
    );

    expect(listItems[0]).not.toHaveFocus();
    expect(listItems[1]).toHaveFocus();
    expect(handleSelect).toHaveBeenCalled();
    expect(handleSelect).toHaveBeenLastCalledWith({ id: 1, value: "one" });
  });

  it("should focus activeIndex", () => {
    const handleSelect = jest.fn();

    render(
      <AutoSuggestList
        activeIndex={1}
        options={[
          { id: 1, value: "one" },
          { id: 2, value: "two" },
        ]}
        role="select"
        onSelectOption={handleSelect}
      />
    );

    expect(screen.getByTestId(AUTOSUGGEST_LIST)).toBeInTheDocument();
    const listItems = screen.getAllByTestId(AUTOSUGGEST_ITEM);
    expect(listItems.length).toBe(2);
    expect(listItems[0]).not.toHaveFocus();
    expect(listItems[1]).toHaveFocus();
  });
});
