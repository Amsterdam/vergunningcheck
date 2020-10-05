import { Paragraph } from "@datapunt/asc-ui";
import React from "react";

type AddressLineProps = {
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
}: AddressLineProps) => (
  <>
    <Paragraph gutterBottom={0}>
      {streetName} {houseNumberFull}
    </Paragraph>
    <Paragraph gutterBottom={16}>
      {postalCode} {residence}
    </Paragraph>
  </>
);
