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
 }: AddressLineProps ) => (
  <>
    {streetName} {houseNumberFull}
    <div>
      {postalCode} {residence}
    </div>
  </>
);
