import styled from "styled-components";
import { Button } from "@datapunt/asc-ui";

export default styled(Button)`
  align-self: flex-start;

  @media print {
    display: none;
  }
`;
