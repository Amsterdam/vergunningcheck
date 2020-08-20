import React from "react";

import { EditButtonStyle } from "./EditButtonStyle";

const EditButton: React.FC<
  { disabled: boolean } & React.HTMLAttributes<HTMLElement>
> = ({ disabled, onClick }) => (
  <EditButtonStyle variant="textButton" {...{ onClick, disabled }}>
    Wijzig
  </EditButtonStyle>
);

export default EditButton;
