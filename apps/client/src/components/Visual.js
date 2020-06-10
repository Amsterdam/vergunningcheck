import React, { useState } from "react";
import { Figure, Img, FigCaption } from "./VisualStyles";

export default ({ title, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  return (
    <Figure loaded={loaded} errored={errored}>
      <Img
        {...rest}
        loaded={loaded}
        errored={errored}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setLoaded(true);
          setErrored(true);
        }}
      />
      {title && !errored && <FigCaption as="figcaption">{title}</FigCaption>}
    </Figure>
  );
};
