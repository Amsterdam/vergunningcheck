// @TODO: convert to TS
import React from "react";

import { Alert, ComponentWrapper } from "../../atoms";

type LocationLoadingProps = {
  loading: boolean;
};

const LocationLoading: React.FC<LocationLoadingProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <ComponentWrapper>
      <Alert content="Wij zoeken het adres." heading="Laden..." />
    </ComponentWrapper>
  );
};

export default LocationLoading;
