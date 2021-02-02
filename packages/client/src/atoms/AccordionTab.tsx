import { ChevronRight, Close } from "@amsterdam/asc-assets";
import React from "react";
import styled from "styled-components";

const AccordionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0 5px 12px;
  cursor: pointer;
  &:hover h4 {
    text-decoration: underline;
  }
`;

const Chevron = styled(ChevronRight)`
  width: 12px;
  height: 12px;
  margin-right: 12px;
`;

const CloseIcon = styled(Close)`
  width: 28px;
  height: 28px;
  margin-right: 12px;
  padding: 4px;
  border: 1px solid black;
`;

const AccordionTab = ({
  id,
  title,
  isOpen,
  deleteTree,
  expandAccordionWithDetailInfo,
}: {
  id: string;
  title: string;
  isOpen: boolean;
  deleteTree: Function;
  expandAccordionWithDetailInfo: Function;
}) => {
  return (
    <AccordionItem
      style={{ backgroundColor: isOpen ? "#efefef" : "#fff" }}
      onClick={expandAccordionWithDetailInfo(id)}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Chevron
          style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0)" }}
        />
        <h4 style={{ margin: 0 }}>{title}</h4>
      </div>
      <CloseIcon onClick={deleteTree(id)} />
    </AccordionItem>
  );
};

export default AccordionTab;
