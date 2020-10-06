import { Paragraph } from "@datapunt/asc-ui";
import React from "react";

type AddressLinesProps = {
  gutterBottom: number;
  houseNumberFull: string;
  postalCode: string;
  residence: string;
  streetName: string;
};

export default ({
  gutterBottom,
  houseNumberFull,
  postalCode,
  residence,
  streetName,
}: AddressLinesProps) => (
  <>
    <Paragraph gutterBottom={0}>
      {streetName} {houseNumberFull}
    </Paragraph>
    <Paragraph gutterBottom={gutterBottom}>
      {postalCode} {residence}
    </Paragraph>
  </>
);
