import React from "react";

import { EditButtonStyle } from "./EditButtonStyle";

const EditButton: React.FC<{ onClick: Function }> = ({ onClick }) => (
  <EditButtonStyle onClick={() => onClick()} variant="textButton">
    Wijzig
  </EditButtonStyle>
);

export default EditButton;
