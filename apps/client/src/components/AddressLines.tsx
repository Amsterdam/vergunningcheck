import { Paragraph } from "@datapunt/asc-ui";
import React from "react";

type AddressLinesProps = {
  houseNumberFull: string;
  marginBottom: number;
  postalCode: string;
  residence: string;
  streetName: string;
};

export default ({
  houseNumberFull,
  marginBottom,
  postalCode,
  residence,
  streetName,
}: AddressLinesProps) => (
  <>
    <Paragraph gutterBottom={0}>
      {streetName} {houseNumberFull}
    </Paragraph>
    <Paragraph gutterBottom={marginBottom}>
      {postalCode} {residence}
    </Paragraph>
  </>
);
