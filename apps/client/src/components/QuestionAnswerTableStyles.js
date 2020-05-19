import styled from "styled-components";
import { Paragraph, themeSpacing } from "@datapunt/asc-ui";
import { avoidPageBreak } from "../utils/themeUtils";

export const QuestionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 7px 0 7px;
  justify-content: space-between;
  border-top: 1px solid black;
  flex-direction: row;

  &:last-of-type {
    border-bottom: 1px solid black;
  }

  ${avoidPageBreak}
`;

export const MainWrapper = styled(QuestionWrapper)`
  font-weight: 700;
`;

export const Question = styled(Paragraph)`
  width: calc(100% - 150px - 60px);
  margin-bottom: 0;
`;

export const UserAnswer = styled(Paragraph)`
  width: 130px;
  margin-bottom: 0;
  padding-right: ${themeSpacing(1)};
  padding-left: ${themeSpacing(1)};
`;

export const UserResult = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  &:last-of-type {
    margin-bottom: ${themeSpacing(2)};
  }
`;

export const UserResultParagraph = styled(Paragraph)`
  margin-bottom: 0;
  padding: ${themeSpacing(3, 0, 3, 3)};
`;

export const Change = styled(Paragraph)`
  width: 60px;
  margin-bottom: 0;
`;
