import { themeSpacing } from "@amsterdam/asc-ui";
import React, { FunctionComponent, HTMLAttributes } from "react";
import styled from "styled-components";

import { TEXT_TO_EDIT_BUTTON } from "../../utils/test-ids";

const TextToEditStyle = styled.span`
  margin-right: ${themeSpacing(5)};
`;

const TextToEdit: FunctionComponent<HTMLAttributes<HTMLElement>> = ({}) => (
  <TextToEditStyle data-testid={TEXT_TO_EDIT_BUTTON}>balbla</TextToEditStyle>
);

export default TextToEdit;
