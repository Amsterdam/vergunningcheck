import { ChevronLeft, ChevronRight, List } from "@amsterdam/asc-assets";
import styled from "styled-components";

type TreesListProps = {
  $isOpen?: boolean;
};

export const ArrowRight = styled(ChevronRight)`
  width: 10%;
  height: 42px;
  padding: 4px;

  border: 1px solid #a8a8a8;

  @media (max-width: 575px) {
    height: 28px;
  }
`;

export const ArrowLeft = styled(ChevronLeft)`
  width: 10%;
  height: 42px;
  padding: 4px;

  border: 1px solid #a8a8a8;

  @media (max-width: 575px) {
    height: 28px;
  }
`;

export const StyledListIcon = styled(List)`
  width: 32px;
  height: 32px;
  margin-right: 16px;
`;

export const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AccordionContent = styled.div`
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-xontent: space-between;

  border: 1px solid #a8a8a8;
  overflow: auto;

  @media (max-width: 880px) {
    min-height: unset;
    height: 220px;
  }

  @media (max-width: 575px) {
    height: 200px;
  }
`;

export const TableLogo = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-end;
  padding: 5px 10px;
  margin-bottom: 15px;

  border: 3px solid black;

  @media (max-width: 880px) {
    display: none;
  }
`;

export const TableTitle = styled.h4`
  margin: 0;

  font-size: 18px;
`;

export const TreesList = styled.dl<TreesListProps>`
  display: grid;
  grid-template-columns: max-content auto;
  margin: 0;
  padding: 5px 10px 10px 35px;

  background-color: ${({ $isOpen }) => ($isOpen ? "#efefef" : "#fff")};

  @media (max-width: 470px) {
    font-size: 14px;
  }

  @media (max-width: 380px) {
    padding: 5px 10px 10px 15px;
  }
`;

export const TreesItemTerm = styled.dt`
  width: 100px;
  margin: 5px 0;
  grid-column-start: 1;
`;

export const TreesItemDefinition = styled.dd`
  grid-column-start: 2;
  margin: 5px 0;

  font-weight: 700;
`;

export const PaginationContainer = styled.div`
  width: 300px;
  margin: 20px 0;
  display: flex;
  align-self: center;

  @media (max-width: 990px) {
    width: 280px;
  }

  @media (max-width: 410px) {
    width: 240px;
  }

  @media (max-width: 380px) {
    width: 180px;
  }
`;

export const PaginationContent = styled.div`
  width: 80%;

  text-align: center;
  line-height: 2.1;

  border: 1px solid #a8a8a8;
  border-left: 0;
  border-right: 0;

  @media (max-width: 575px) {
    line-height: 1.6;
  }

  @media (max-width: 380px) {
    font-size: 14px;
    line-height: 1.8;
  }
`;

export const PaginationCurrentPage = styled.span`
  font-weight: 700;
`;

export const PaginationSeparator = styled.span`
  margin: 5px;
`;
