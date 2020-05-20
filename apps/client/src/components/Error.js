import React from "react";
import { Alert } from "@datapunt/asc-ui";
import { ComponentWrapper } from "./Atoms";

const Error = ({ heading, content, stack, children }) => (
  <ComponentWrapper>
    <Alert
      level="error"
      heading={heading || `Er is een fout opgetreden.`}
      content={content}
      style={{ display: "block" }} // IE11 Fix
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
