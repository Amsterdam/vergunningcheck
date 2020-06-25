import React, { useState } from "react";

import { Caption, Figure, Img } from "./VisualStyles";

export default ({ title, src, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <Figure loaded={loaded} errored={errored}>
      <Img
        {...rest}
        src={`${process.env.REACT_APP_IMAGE_PROXY}${src}?width=648`}
        loaded={loaded}
        errored={errored}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setLoaded(true);
          setErrored(true);
        }}
      />
      {title && !errored && (
        <figcaption>
          <Caption>{title}</Caption>
        </figcaption>
      )}
    </Figure>
  );
};
