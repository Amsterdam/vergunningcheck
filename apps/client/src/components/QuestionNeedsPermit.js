import { Paragraph } from "@datapunt/asc-ui";
import React from "react";

import Alert from "../atoms/Alert";

export default () => {
  return (
    <Alert level="warning" style={{ marginTop: 16 }}>
      <Paragraph>
        Door dit antwoord hebt u een vergunning nodig. Als u een ander antwoord
        geeft hebt u misschien geen vergunning nodig.
      </Paragraph>
    </Alert>
  );
};
