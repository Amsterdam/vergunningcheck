import { Alert, themeSpacing } from "@amsterdam/asc-ui";
import styled, { css } from "styled-components";

type AlertProps = {
  marginBottom?: number;
  white?: boolean;
};

export default styled(Alert)<AlertProps>`
  margin-top: ${themeSpacing(4)};
  /* IE11 Fix */
  display: block;
  white-space: pre-line;

  a:hover {
    ${({ white }) =>
      !white &&
      css`
        color: #fff;
        font-weight: 800;
      `}
  }

  ${({ white }) =>
    white &&
    css`
      background-color: white;
    `}

  ${({ marginBottom }) =>
    css`
      margin-bottom: ${marginBottom ? marginBottom + "px" : themeSpacing(6)};
    `}

  @media print {
    -webkit-print-color-adjust: exact;
  }
`;
