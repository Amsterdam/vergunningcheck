import React, { useState } from "react";
import { Figure, Img, FigCaption } from "./VisualStyles";

export default ({ title, ...rest }) => {
  const [loading, setLoading] = useState(true);
  return (
    <Figure isLoading={loading}>
      <Img {...rest} onLoad={() => setLoading(false)} />
      {title && <FigCaption>{title}</FigCaption>}
    </Figure>
  );
};
