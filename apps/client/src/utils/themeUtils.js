import { themeColor } from "@datapunt/asc-ui";
import { css } from "styled-components";

export const outlineStyle = css`
  outline-color: ${themeColor("support", "focus")};
  outline-style: solid;
  outline-offset: 3px;
  outline-width: 3px;
`;

export const focusOutlineStyle = css`
  &:focus {
    ${outlineStyle}
  }
`;

export const printOnly = css`
  display: none;

  @media print {
    display: block;
    -webkit-print-color-adjust: exact;
  }
`;

// Avoid breaking over serarate pages (print view only)
export const avoidPageBreak = css`
  @media print {
    page-break-inside: avoid;
    * {
      page-break-inside: avoid;
    }
  }
`;
