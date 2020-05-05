import React from "react";
import { Figure, Img, FigCaption } from "./VisualStyles";

export default ({ title, ...rest }) => (
  <Figure>
    <Img {...rest} />
    {title && <FigCaption>{title}</FigCaption>}
  </Figure>
);
