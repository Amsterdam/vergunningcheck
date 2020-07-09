import { captureException } from "@sentry/browser";
import React, { useState } from "react";

import { Caption, Figure, Img } from "./VisualStyles";

export default ({ title, src, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const handleError = () => {
    setLoaded(true);
    setErrored(true);
    captureException(`${src} not found`);
  };

  return (
    <Figure loaded={loaded} errored={errored}>
      <Img
        {...rest}
        src={src}
        loaded={loaded}
        errored={errored}
        onLoad={() => setLoaded(true)}
        onError={handleError}
      />
      {title && !errored && (
        <figcaption>
          <Caption>{title}</Caption>
        </figcaption>
      )}
    </Figure>
  );
};
