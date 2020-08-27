import { Alert } from "@datapunt/asc-ui";
import styled from "styled-components";

export default styled(Alert)`
  /* IE11 Fix */
  display: block;
  white-space: pre-line;

  @media print {
    -webkit-print-color-adjust: exact;
  }
`;
