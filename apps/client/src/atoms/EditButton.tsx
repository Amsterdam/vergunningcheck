import { Button } from "@datapunt/asc-ui";
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
  { disabled?: boolean } & React.HTMLAttributes<HTMLElement>
> = ({ disabled = false, onClick }) => (
  <EditButtonStyle
    data-testid={EDIT_BUTTON}
    variant="textButton"
    {...{ disabled, onClick }}
  >
    Wijzig
  </EditButtonStyle>
);

export default EditButton;
