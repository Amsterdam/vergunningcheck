import { Paragraph } from "@datapunt/asc-ui";
import React from "react";

import { TextToEdit } from "../atoms";

type AddressLinesProps = {
  editAddressRenderer?: Function;
  gutterBottom: number;
  houseNumberFull: string;
  postalCode: string;
  residence: string;
  streetName: string;
};

export default ({
  editAddressRenderer,
  gutterBottom,
  houseNumberFull,
  postalCode,
  residence,
  streetName,
}: AddressLinesProps) => (
  <>
    <Paragraph gutterBottom={0}>
      <TextToEdit>
        {streetName} {houseNumberFull}
      </TextToEdit>
      {editAddressRenderer && editAddressRenderer()}
    </Paragraph>
    <Paragraph gutterBottom={gutterBottom}>
      {postalCode} {residence}
    </Paragraph>
  </>
);
