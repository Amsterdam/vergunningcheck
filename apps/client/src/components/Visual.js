import React, { useState } from "react";
import { Figure, Img, FigCaption } from "./VisualStyles";

export default ({ title, ...rest }) => {
  const [loading, setLoading] = useState(true);
  return (
    <Figure loading={loading}>
      <Img {...rest} loading={loading} onLoad={() => setLoading(false)} />
      {title && <FigCaption>{title}</FigCaption>}
    </Figure>
  );
};
