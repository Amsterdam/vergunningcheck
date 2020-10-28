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
  { dataTestid?: string; disabled?: boolean } & React.HTMLAttributes<
    HTMLElement
  >
> = ({ dataTestid = EDIT_BUTTON, disabled = false, onClick }) => (
  <EditButtonStyle
    data-testid={dataTestid}
    variant="textButton"
    {...{ disabled, onClick }}
  >
    Wijzig
  </EditButtonStyle>
);

export default EditButton;
