import React, { useState } from "react";

import { Caption, Figure, Img } from "./VisualStyles";

export default ({ title, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const setError = () => {
    setLoaded(true);
    setErrored(true);
    // Sentry.captureException(err);
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
