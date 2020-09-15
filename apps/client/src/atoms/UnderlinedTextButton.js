import { Button } from "@datapunt/asc-ui";
import styled from "styled-components";

export default styled(Button)`
  text-decoration: underline;
  &:disabled {
    text-decoration: underline;
  }
  @media print {
    display: none;
  }
`;
