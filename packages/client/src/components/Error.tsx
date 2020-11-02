import React, { ReactNode } from "react";

import { Alert, ComponentWrapper } from "../atoms";

const Error: React.FC<{
  children: ReactNode;
  content?: string;
  heading: string;
  stack?: string;
}> = ({ children, content, heading, stack }) => (
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
