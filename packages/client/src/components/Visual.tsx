import { captureException } from "@sentry/react";
import React, { FunctionComponent, useState } from "react";

import { FIGCAPTION, FIGURE, IMG } from "../utils/test-ids";
import { Caption, Figure, Img } from "./VisualStyles";

type VisualProps = {
  alt?: string;
  src: string;
  title?: string;
};

const Visual: FunctionComponent<VisualProps> = ({ alt, src, title }) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const handleError = () => {
    setLoaded(true);
    setErrored(true);
    captureException(`${src} not found`);
  };

  return (
    <Figure data-testid={FIGURE} errored={errored} loaded={loaded}>
      <Img
        alt={alt || title || ""}
        data-testid={IMG}
        errored={errored}
        loaded={loaded}
        onError={handleError}
        onLoad={() => setLoaded(true)}
        src={src}
      />
      {title && (
        <figcaption data-testid={FIGCAPTION}>
          <Caption>{title}</Caption>
        </figcaption>
      )}
    </Figure>
  );
};

export default Visual;
