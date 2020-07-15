import React from "react";

import { Alert, ComponentWrapper } from "../atoms";

const Error = ({ heading, content, stack, children }) => (
  <ComponentWrapper>
    <Alert
      level="error"
      heading={heading || `Er is een fout opgetreden.`}
      content={content}
    >
      {children}

      {/* Display error stack in screen (not in production) */}
      {stack && process.env.NODE_ENV !== "production" && (
        <pre style={{ whiteSpace: "normal" }}>{stack}</pre>
      )}
    </Alert>
  </ComponentWrapper>
);

export default Error;
