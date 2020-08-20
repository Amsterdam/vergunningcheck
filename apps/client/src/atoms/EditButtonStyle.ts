import { Button, themeSpacing } from "@datapunt/asc-ui";
import styled from "styled-components";

export const EditButtonStyle = styled(Button)`
  margin-left: ${themeSpacing(5)};
  text-decoration: underline;
  &:disabled {
    text-decoration: underline;
  }
  @media print {
    display: none;
  }
`;
