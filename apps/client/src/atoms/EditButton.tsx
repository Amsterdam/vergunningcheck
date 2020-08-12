import React from "react";

import { EditButtonStyle } from "./EditButtonStyle";

const EditButton: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  onClick,
}) => (
  <EditButtonStyle {...{ onClick }} variant="textButton">
    Wijzig
  </EditButtonStyle>
);

export default EditButton;
