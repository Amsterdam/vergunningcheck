import { css } from "styled-components";

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
