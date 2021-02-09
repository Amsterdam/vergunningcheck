import userEvent from "@testing-library/user-event";
import i18n from "i18next";
import React from "react";

import mockedTreeList, {
  CircleMarkerTreeInfo,
} from "../__mocks__/treesListMocks";
import {
  ACCORDION_PAGINATION_CONTENT,
  ACCORDION_PAGINATION_NEXT,
  ACCORDION_PAGINATION_PREV,
} from "../utils/test-ids";
import { render, screen } from "../utils/test-utils";
import AccordionList from "./AccordionList";

describe("AccordionList", () => {
  const treeList: CircleMarkerTreeInfo[] = [];
  const expandAccordionItemTreeInfo = jest.fn();
  const deleteTree = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly whitout trees", () => {
    render(
      <AccordionList
        treesList={treeList}
        expandAccordionWithDetailInfo={expandAccordionItemTreeInfo}
        deleteTree={deleteTree}
      />
    );

    // should have table heading
    const title = i18n.t("accordionList.title");
    expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();

    // should not have pagination
    expect(
      screen.queryByTestId(ACCORDION_PAGINATION_CONTENT)
    ).not.toBeInTheDocument();
  });

  fit("should render correctly w/ trees", async () => {
    render(
      <AccordionList
        treesList={mockedTreeList.map((item) => ({
          ...item,
          isSelected: true,
        }))}
        expandAccordionWithDetailInfo={expandAccordionItemTreeInfo}
        deleteTree={deleteTree}
      />
    );

    // should have table heading
    const title = i18n.t("accordionList.title");
    expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();

    let pageElements = screen.getAllByRole("heading", { name: /boom nummer/i });
    expect(pageElements.length).toBe(6);
    pageElements.map((elem, i) =>
      expect(elem).toHaveTextContent(`Boom nummer ${i + 1}`)
    );

    let pagination = await screen.findByTestId(ACCORDION_PAGINATION_CONTENT);
    expect(pagination).toHaveTextContent("1 van 4");

    // should have goto previous page btn
    const prevBtn = await screen.findByTestId(ACCORDION_PAGINATION_PREV);
    expect(prevBtn).toBeInTheDocument();

    // should have goto next page btn
    const nextBtn = await screen.findByTestId(ACCORDION_PAGINATION_NEXT);
    expect(nextBtn).toBeInTheDocument();

    // should not goto to page 0 or -1...
    userEvent.click(prevBtn);
    userEvent.click(prevBtn);

    pagination = await screen.findByTestId(ACCORDION_PAGINATION_CONTENT);
    expect(pagination).toHaveTextContent("1 van 4");

    // should goto next page
    userEvent.click(nextBtn);
    pagination = await screen.findByTestId(ACCORDION_PAGINATION_CONTENT);
    expect(pagination).toHaveTextContent("2 van 4");

    // assert page content
    pageElements = screen.getAllByRole("heading", { name: /boom nummer/i });
    expect(pageElements.length).toBe(6);
    pageElements.map((elem, i) =>
      expect(elem).toHaveTextContent(`Boom nummer ${i + 7}`)
    );

    // should goto prev page
    userEvent.click(prevBtn);
    pagination = await screen.findByTestId(ACCORDION_PAGINATION_CONTENT);
    expect(pagination).toHaveTextContent("1 van 4");

    // should not goto to page higher then max page...
    userEvent.click(nextBtn);
    userEvent.click(nextBtn);
    userEvent.click(nextBtn);
    userEvent.click(nextBtn);
    userEvent.click(nextBtn);

    pagination = await screen.findByTestId(ACCORDION_PAGINATION_CONTENT);
    expect(pagination).toHaveTextContent("4 van 4");

    // assert page content
    pageElements = screen.getAllByRole("heading", { name: /boom nummer/i });
    expect(pageElements.length).toBe(2);
    pageElements.map((elem, i) =>
      expect(elem).toHaveTextContent(`Boom nummer ${i + 19}`)
    );
  });
});
