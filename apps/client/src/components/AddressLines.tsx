import { Paragraph } from "@datapunt/asc-ui";
import React from "react";

type AddressLinesProps = {
  houseNumberFull: string;
  postalCode: string;
  residence: string;
  streetName: string;
};

export default ({
  houseNumberFull,
  postalCode,
  residence,
  streetName,
}: AddressLinesProps) => (
  <>
    <Paragraph gutterBottom={0}>
      {streetName} {houseNumberFull}
    </Paragraph>
    <Paragraph gutterBottom={16}>
      {postalCode} {residence}
    </Paragraph>
  </>
);
