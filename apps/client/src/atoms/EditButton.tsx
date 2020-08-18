import React from "react";

import { EditButtonStyle } from "./EditButtonStyle";

const EditButton: React.FC<
  { editDisabled: boolean } & React.HTMLAttributes<HTMLElement>
> = ({ editDisabled, onClick }) => (
  <EditButtonStyle
    {...{ onClick }}
    variant="textButton"
    disabled={editDisabled}
  >
    Wijzig
  </EditButtonStyle>
);

export default EditButton;
