import { TextField } from "@amsterdam/asc-ui";
import styled from "styled-components";

export const LocationTextField = styled(TextField)`
  max-width: 160px;
  ::-ms-clear {
    display: none;
  }
`;
