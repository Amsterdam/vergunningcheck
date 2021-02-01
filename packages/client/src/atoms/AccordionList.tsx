import { ChevronLeft, ChevronRight, Close } from "@amsterdam/asc-assets";
import chunk from "lodash/chunk";
import React, { useState } from "react";
import styled from "styled-components";

interface treeInformation {
  id: string;
  title: string;
  isOpen: boolean;
  detailsInfo: {
    treeId: string;
    speciesName: string;
    treeType: string;
    height: string;
    recordYear: number;
    owner: string;
    administrator: string;
  };
}

interface Props {
  isOpen: boolean;
}

interface schemaLabels {
  [key: string]: string;
}

const AccordionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0 5px 12px;
  cursor: pointer;
  background-color: ${(props: Props) => (props.isOpen ? "#efefef" : "#fff")};
  &:hover h4 {
    text-decoration: underline;
  }
`;

const Chevron = styled(ChevronRight)`
  width: 12px;
  height: 12px;
  margin-right: 12px;
  transform: ${(props: Props) =>
    props.isOpen ? "rotate(90deg)" : "rotate(0)"};
`;

const CloseIcon = styled(Close)`
  width: 28px;
  height: 28px;
  margin-right: 12px;
  padding: 4px;
  border: 1px solid black;
`;

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
  updateTreesList,
  deleteTree,
}: {
  treesList: treeInformation[];
  updateTreesList: Function;
  deleteTree: Function;
}) => {
  const [currentPageList, setCurrentPageList] = useState(1);
  const maxRecordOnPage = 6;
  const totalPages = Math.ceil(treesList.length / maxRecordOnPage);
  const splittedData = chunk(treesList, maxRecordOnPage);
  const currentData = splittedData[currentPageList - 1];

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
        {currentData.map((item: treeInformation) => {
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
            <div>
              <AccordionItem isOpen={isOpen} onClick={updateTreesList(id)}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Chevron isOpen={isOpen} />
                  <h4 style={{ margin: 0 }}>{title}</h4>
                </div>
                <CloseIcon onClick={deleteTree(id)} />
              </AccordionItem>

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
                      <>
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
                      </>
                    );
                  })}
                </dl>
              )}
            </div>
          );
        })}
      </div>
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
    </div>
  );
};

export default AccordionList;
