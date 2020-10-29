import { themeSpacing } from "@amsterdam/asc-ui";
import styled, { css } from "styled-components";

import { Alert } from "../atoms";
import { QuestionAlertProps } from "./QuestionAlert";

export const QuestionAlertStyle = styled(Alert)<QuestionAlertProps>`
  margin-top: ${themeSpacing(4)};
  /* @TODO: add yellow color to ASC-UI and replace it here */
  background-color: #f6c948;

  ${(props) =>
    css`
      margin-bottom: ${props.marginBottom
        ? props.marginBottom + "px"
        : themeSpacing(6)};
    `}
`;
