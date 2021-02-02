import { ChevronLeft, ChevronRight } from "@amsterdam/asc-assets";
import chunk from "lodash/chunk";
import React, { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import { dotsTree } from "../../__mocks__/treesListMocks";
import AccordionTab from "../AccordionTab/AccordionTab";

interface schemaLabels {
  [key: string]: string;
}

const ArrowRight = styled(ChevronRight)`
  width: 10%;
  height: 42px;
  padding: 4px;
  border: 1px solid #a8a8a8;
`;

const ArrowLeft = styled(ChevronLeft)`
  width: 10%;
  height: 42px;
  padding: 4px;
  border: 1px solid #a8a8a8;
`;

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
  treesList: dotsTree[];
  expandAccordionWithDetailInfo: Function;
  deleteTree: Function;
}) => {
  const treesListForRender = treesList.filter((tree) => tree.isSelected);

  const [currentPageList, setCurrentPageList] = useState(1);
  const maxRecordOnPage = 6;
  const totalPages = Math.ceil(treesListForRender.length / maxRecordOnPage);
  const splittedData = chunk(treesListForRender, maxRecordOnPage) || [];
  const currentData = splittedData[currentPageList - 1] || [];

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
    <div
      style={{
        minHeight: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: "1px solid #a8a8a8",
      }}
    >
      <div>
        {currentData.map((item: dotsTree) => {
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
                <dl
                  style={{
                    display: "grid",
                    gridTemplateColumns: "max-content auto",
                    margin: 0,
                    padding: "5px 10px 10px 35px",
                    backgroundColor: isOpen ? "#efefef" : "#fff",
                  }}
                >
                  {Object.entries(detailsInfo).map((item) => {
                    return (
                      <React.Fragment key={uuidv4()}>
                        <dt
                          style={{
                            width: 100,
                            gridColumnStart: 1,
                            margin: "5px 0",
                          }}
                        >
                          {schema[item[0]]}
                        </dt>
                        <dd
                          style={{
                            gridColumnStart: 2,
                            margin: "5px 0",
                            fontWeight: 700,
                          }}
                        >
                          {item[1]}
                        </dd>
                      </React.Fragment>
                    );
                  })}
                </dl>
              )}
            </div>
          );
        })}
      </div>
      {totalPages > 1 && (
        <div
          style={{
            width: 300,
            marginBottom: 20,
            display: "flex",
            alignSelf: "center",
          }}
        >
          <ArrowLeft onClick={paginatePage("prev")} />

          <div
            style={{
              width: "80%",
              border: "1px solid #a8a8a8",
              borderLeft: 0,
              borderRight: 0,
              textAlign: "center",
              lineHeight: "2.1",
            }}
          >
            <span>
              <span style={{ fontWeight: 700 }}>{currentPageList}</span>
              <span style={{ margin: 5 }}>van</span>
              <span>{totalPages}</span>
            </span>
          </div>

          <ArrowRight onClick={paginatePage("next")} />
        </div>
      )}
    </div>
  );
};

export default AccordionList;
