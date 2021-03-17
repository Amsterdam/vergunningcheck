import { css } from "styled-components";

export const printOnly = css`
  @media screen {
    display: none;
  }

  @media print {
    -webkit-print-color-adjust: exact;
  }
`;

// Avoid breaking over separate pages (print view only)
export const avoidPageBreak = css`
  @media print {
    page-break-inside: avoid;
    * {
      page-break-inside: avoid;
    }
  }
`;
