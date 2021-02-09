import { useMatchMedia } from "@amsterdam/asc-ui/lib/utils/hooks";
import chunk from "lodash/chunk";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { CircleMarkerTreeInfo } from "../__mocks__/treesListMocks";
import {
  ACCORDION_PAGINATION_CONTENT,
  ACCORDION_PAGINATION_NEXT,
  ACCORDION_PAGINATION_PREV,
} from "../utils/test-ids";
import {
  AccordionContainer,
  AccordionContent,
  ArrowLeft,
  ArrowRight,
  PaginationContainer,
  PaginationContent,
  PaginationCurrentPage,
  PaginationSeparator,
  StyledListIcon,
  TableLogo,
  TableTitle,
  TreesItemDefinition,
  TreesItemTerm,
  TreesList,
} from "./AccordionListStyles";
import AccordionTab from "./AccordionTab";

interface schemaLabels {
  [key: string]: string;
}

const schema: schemaLabels = {
  treeId: "Boom",
  speciesName: "Soortnaam",
  treeType: "Boomtype",
  height: "Hoogte",
  recordYear: "Platjaar",
  owner: "Eigenaar",
  administrator: "Beheerder",
};

const AccordionList = ({
  treesList,
  expandAccordionWithDetailInfo,
  deleteTree,
}: {
  treesList: CircleMarkerTreeInfo[];
  expandAccordionWithDetailInfo: Function;
  deleteTree: Function;
}) => {
  const [showDesktopVariant] = useMatchMedia({
    maxBreakpoint: "tabletM",
  });

  const { t } = useTranslation();
  const treesListForRender = treesList.filter((tree) => tree.isSelected);
  const [currentPageList, setCurrentPageList] = useState(1);
  const maxRecordOnPage = showDesktopVariant ? 3 : 6;
  const totalPages = Math.ceil(treesListForRender.length / maxRecordOnPage);
  const splittedData = chunk(treesListForRender, maxRecordOnPage) || [];
  const currentData = splittedData[currentPageList - 1] || [];

  const checkedCurrentData =
    currentPageList > 1 && currentData.length === 0
      ? splittedData[0] || []
      : currentData || [];

  const paginatePage = (direction: string) => () => {
    if (direction === "prev") {
      if (currentPageList === 1) return;
      setCurrentPageList(currentPageList - 1);
    } else {
      if (currentPageList === totalPages) return;
      setCurrentPageList(currentPageList + 1);
    }
  };

  return (
    <AccordionContainer>
      <TableLogo>
        <StyledListIcon />
        <TableTitle>{t("accordionList.title")}</TableTitle>
      </TableLogo>
      <AccordionContent>
        <div>
          {checkedCurrentData.map((item: CircleMarkerTreeInfo) => {
            const {
              id,
              title,
              isOpen,
              detailsInfo,
            }: {
              id: string;
              title: string;
              isOpen: boolean;
              detailsInfo: object;
            } = item;

            return (
              <div key={id}>
                <AccordionTab
                  id={id}
                  title={title}
                  isOpen={isOpen}
                  deleteTree={deleteTree}
                  expandAccordionWithDetailInfo={expandAccordionWithDetailInfo}
                />
                {isOpen && (
                  <TreesList isOpen={isOpen}>
                    {Object.entries(detailsInfo).map((item) => {
                      return (
                        <React.Fragment key={id}>
                          <TreesItemTerm>{schema[item[0]]}</TreesItemTerm>
                          <TreesItemDefinition>{item[1]}</TreesItemDefinition>
                        </React.Fragment>
                      );
                    })}
                  </TreesList>
                )}
              </div>
            );
          })}
        </div>
        {totalPages > 1 && (
          <PaginationContainer>
            <ArrowLeft
              data-testid={ACCORDION_PAGINATION_PREV}
              onClick={paginatePage("prev")}
            />
            <PaginationContent data-testid={ACCORDION_PAGINATION_CONTENT}>
              <span>
                <PaginationCurrentPage>{currentPageList}</PaginationCurrentPage>
                <PaginationSeparator> van </PaginationSeparator>
                <span>{totalPages}</span>
              </span>
            </PaginationContent>
            <ArrowRight
              data-testid={ACCORDION_PAGINATION_NEXT}
              onClick={paginatePage("next")}
            />
          </PaginationContainer>
        )}
      </AccordionContent>
    </AccordionContainer>
  );
};

export default AccordionList;
