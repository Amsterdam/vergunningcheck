import { Paragraph } from "@amsterdam/asc-ui";
import React from "react";

import { TextToEdit } from "../atoms";
import { Address } from "../types";

type AddressLinesProps = {
  address: Address;
  editAddressRenderer?: () => void;
  gutterBottom: number;
};

export default ({
  address,
  editAddressRenderer,
  gutterBottom,
}: AddressLinesProps) => {
  if (!address) return null;
  const { houseNumberFull, postalCode, residence, streetName } = address;
  return (
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
};
