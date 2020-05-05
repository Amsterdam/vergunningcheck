import styled from "styled-components";
// Component Alert has wrong export name `AlertMessage`. When the new update is released, just remove `AlertMessage as`
import { AlertMessage as Alert, TextField } from "@datapunt/asc-ui";

export const StyledTextField = styled(TextField)`
  margin-bottom: 25px;
`;

export const StyledAlert = styled(Alert)`
  margin-bottom: 25px;
`;
