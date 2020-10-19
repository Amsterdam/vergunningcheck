import { Heading, Paragraph } from "@amsterdam/asc-ui";
import React from "react";

export default ({ children }) => (
  <>
    <Heading forwardedAs="h3">Hoe werkt het?</Heading>
    <Paragraph gutterBottom={8}>{children}</Paragraph>
    <Paragraph>U voert eerst het adres van het gebouw in</Paragraph>
  </>
);
