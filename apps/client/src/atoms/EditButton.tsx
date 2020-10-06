import { Button } from "@amsterdam/asc-ui";
import React from "react";
import styled from "styled-components";

import { EDIT_BUTTON } from "../utils/test-ids";

const EditButtonStyle = styled(Button)`
  text-decoration: underline;
  &:disabled {
    text-decoration: underline;
  }
  @media print {
    display: none;
  }
`;

const EditButton: React.FC<
  { disabled: boolean } & React.HTMLAttributes<HTMLElement>
> = ({ disabled, onClick }) => (
  <EditButtonStyle
    data-testid={EDIT_BUTTON}
    variant="textButton"
    {...{ onClick, disabled }}
  >
    Wijzig
  </EditButtonStyle>
);

export default EditButton;
