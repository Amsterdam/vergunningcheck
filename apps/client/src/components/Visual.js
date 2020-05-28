import React, { useState } from "react";
import { Figure, Img, FigCaption } from "./VisualStyles";

export default ({ title, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <Figure loaded={loaded}>
      <Img {...rest} loaded={loaded} onLoad={() => setLoaded(true)} />
      {title && <FigCaption>{title}</FigCaption>}
    </Figure>
  );
};
