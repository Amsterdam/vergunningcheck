import { Heading, Paragraph } from "@amsterdam/asc-ui";
import React from "react";

import { PrintOnly } from "../atoms";

// Format the date to show in Print
const date = new Date();
const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};
const currentDateTime = date.toLocaleDateString("nl-NL", options);

export default () => (
  <PrintOnly>
    <Heading forwardedAs="h3">Pagina</Heading>
    <Paragraph fontSize={12}>{window.location.href}</Paragraph>

    <Heading forwardedAs="h3">Datum</Heading>
    <Paragraph>{currentDateTime} uur.</Paragraph>
  </PrintOnly>
);
