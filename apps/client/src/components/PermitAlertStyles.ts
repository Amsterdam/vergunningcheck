import { themeSpacing } from "@datapunt/asc-ui";
import styled from "styled-components";

import Alert from "../atoms/Alert";

export const PermitAlertStyle = styled(Alert)`
  margin-top: ${themeSpacing(4)};
  /* @TODO: add yellow color to ASC-UI and replace it here */
  background-color: #f6c948;
`;
