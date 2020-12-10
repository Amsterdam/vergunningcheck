import { Heading, Link } from "@amsterdam/asc-ui";
import React from "react";

import HiddenDebugInfo from "../components/HiddenDebugInfo";

const ENV = process.env as { [key: string]: string | undefined };

export default () => (
  <HiddenDebugInfo title="Environment">
    <Heading forwardedAs="h2">process.env</Heading>
    <code>
      <pre>
        {Object.entries(ENV).map(([key, value]) => (
          <span key={key}>
            {key}:{" "}
            {(() => {
              switch (key) {
                case "REACT_APP_GIT_SHA":
                  return (
                    <Link
                      href={`https://github.com/Amsterdam/vergunningcheck/commit/${value}`}
                      target="_blank"
                    >
                      {value}
                    </Link>
                  );
                case "REACT_APP_GRAPHQL_API_URL":
                  return (
                    <Link href={value} target="_blank">
                      {value}
                    </Link>
                  );
                case "REACT_APP_GIT_BRANCH":
                  return (
                    <Link
                      href={`https://github.com/Amsterdam/vergunningcheck/tree/${value}`}
                      target="_blank"
                    >
                      {value}
                    </Link>
                  );
                default: {
                  return value;
                }
              }
            })()}
            {`\n`}
          </span>
        ))}
      </pre>
    </code>
  </HiddenDebugInfo>
);
