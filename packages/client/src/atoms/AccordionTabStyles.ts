import { ChevronRight, Close } from "@amsterdam/asc-assets";
import styled from "styled-components";

type Props = {
  $isOpen: boolean;
};

export const AccordionItem = styled.div<Props>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0 5px 12px;

  cursor: pointer;
  background-color: ${({ $isOpen }) => ($isOpen ? "#efefef" : "#fff")};
`;

export const AccordionItemContent = styled.div`
  display: flex;
  align-items: center;
`;

export const AccordionItemTitle = styled.h4`
  margin: 0;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 380px) {
    font-size: 14px;
  }
`;

export const Chevron = styled(ChevronRight)<Props>`
  width: 12px;
  height: 12px;
  margin-right: 12px;

  transform: ${({ $isOpen }) => ($isOpen ? "rotate(90deg)" : "rotate(0)")};
`;

export const CloseIcon = styled(Close)`
  width: 28px;
  height: 28px;
  margin-right: 12px;
  padding: 4px;

  border: 1px solid black;

  @media (max-width: 380px) {
    width: 20px;
    height: 20px;
  }
`;
