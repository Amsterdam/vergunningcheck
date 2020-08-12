import { Button, themeSpacing } from "@datapunt/asc-ui";
import styled from "styled-components";

export const EditQuestionButton = styled(Button)`
  margin-left: ${themeSpacing(5)};

  @media print {
    display: none;
  }
`;
