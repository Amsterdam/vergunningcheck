import { Heading, Paragraph } from "@amsterdam/asc-ui";
import React from "react";

export default ({ children }) => (
  <>
    <Heading forwardedAs="h3">Vergunningcheck</Heading>
    <Paragraph gutterBottom={8}>{children}</Paragraph>
    <Paragraph>
      Als eerste stap krijgt u informatie over het gebouw waar u dit wilt doen.
    </Paragraph>
  </>
);
