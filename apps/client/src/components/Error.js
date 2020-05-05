import React from "react";
// Component Alert has wrong export name `AlertMessage`. When the new update is released, just remove `AlertMessage as`
import { AlertMessage as Alert } from "@datapunt/asc-ui";

const Error = ({ heading, content, stack, children }) => (
  <Alert
    level="error"
    heading={heading || `Er is een fout opgetreden.`}
    content={content}
    style={{ marginBottom: 25 }}
  >
    {children}

    {/* Display error stack in screen (not in production) */}
    {stack && process.env.NODE_ENV !== "production" && (
      <pre style={{ whiteSpace: "normal" }}>{stack}</pre>
    )}
  </Alert>
);

export default Error;
