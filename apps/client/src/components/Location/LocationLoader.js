import React from "react";

import { Alert, ComponentWrapper } from "../../atoms";

const LocationtLoader = ({ loading }) => {
  if (!loading) return null;

  return (
    <ComponentWrapper>
      <Alert content="Wij zoeken het adres." heading="Laden..." />
    </ComponentWrapper>
  );
};

export default LocationtLoader;
