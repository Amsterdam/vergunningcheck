import React from "react";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTitle,
  Chevron,
  CloseIcon,
} from "./AccordionTabStyles";

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
    <AccordionItem $isOpen={isOpen} onClick={expandAccordionWithDetailInfo(id)}>
      <AccordionItemContent>
        <Chevron $isOpen={isOpen} />
        <AccordionItemTitle>{title}</AccordionItemTitle>
      </AccordionItemContent>
      <CloseIcon onClick={deleteTree(id)} />
    </AccordionItem>
  );
};

export default AccordionTab;
