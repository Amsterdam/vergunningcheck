import React from "react";
import { useTranslation } from "react-i18next";

import { Alert, ComponentWrapper } from "../atoms";

type ErrorProps = {
  content?: string;
  heading?: string;
  stack?: string;
};

const Error: React.FC<ErrorProps> = ({ children, content, heading, stack }) => {
  const { t } = useTranslation();
  return (
    <ComponentWrapper>
      <Alert
        content={content}
        heading={heading || t("errorMessages.error occured")}
        level="error"
      >
        {children}

        {/* Display error stack in screen (not in production) */}
        {stack && process.env.NODE_ENV !== "production" && (
          <pre style={{ whiteSpace: "normal" }}>{stack}</pre>
        )}
      </Alert>
    </ComponentWrapper>
  );
};

export default Error;
