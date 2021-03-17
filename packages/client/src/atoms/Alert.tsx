import { Alert, themeSpacing } from "@amsterdam/asc-ui";
import styled, { css } from "styled-components";

type AlertProps = {
  marginBottom?: number;
  level?: string;
};

export default styled(Alert)<AlertProps>`
  margin-top: ${themeSpacing(4)};
  /* IE11 Fix */
  display: block;
  white-space: pre-line;

  ${({ level }) =>
    level &&
    level === "error" &&
    css`
      a:hover {
        color: #fff;
        font-weight: 800;
      }
    `}

  ${({ marginBottom }) =>
    css`
      margin-bottom: ${marginBottom ? marginBottom + "px" : themeSpacing(6)};
    `}

  @media print {
    -webkit-print-color-adjust: exact;
  }
`;
