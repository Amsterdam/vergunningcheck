import React from "react";
import stringifier from "stringifier";

const stringify = stringifier({
  maxDepth: 2,
  indent: "  ",
});

export default ({
  json,
  code,
  condensed = false,
}: {
  json?: any;
  code?: string;
  condensed?: boolean;
}) => (
  <code>
    <pre>
      {json && condensed ? stringify(json) : JSON.stringify(json, null, 2)}
      {code && code}
    </pre>
  </code>
);
