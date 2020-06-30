import * as Sentry from "@sentry/browser";
import React, { useState } from "react";

import { Caption, Figure, Img } from "./VisualStyles";

export default ({ title, src, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const setError = () => {
    setLoaded(true);
    setErrored(true);
    Sentry.captureException(`${src} niet gevonden`);
  };

  return (
    <Figure loaded={loaded} errored={errored}>
      <Img
        {...rest}
        loaded={loaded}
        errored={errored}
        onLoad={() => setLoaded(true)}
        onError={setError}
      />
      {title && !errored && (
        <figcaption>
          <Caption>{title}</Caption>
        </figcaption>
      )}
    </Figure>
  );
};
