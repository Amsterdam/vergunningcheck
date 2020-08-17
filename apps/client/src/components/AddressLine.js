import React from "react";

export default ({ address: { streetName, houseNumberFull }, strong }) =>
  strong ? (
    <strong>
      {streetName} {houseNumberFull}
    </strong>
  ) : (
    <>
      {streetName} {houseNumberFull}
    </>
  );
