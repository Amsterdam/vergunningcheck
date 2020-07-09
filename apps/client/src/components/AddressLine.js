import React from "react";

export default ({ address: { streetName, houseNumberFull } }) => (
  <strong>
    {streetName} {houseNumberFull}
  </strong>
);
