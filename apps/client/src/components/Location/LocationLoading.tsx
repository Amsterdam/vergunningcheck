import React from "react";

import { Alert, ComponentWrapper } from "../../atoms";

type LocationLoadingProps = {
  loading: boolean;
};

const LocationLoading: React.FC<LocationLoadingProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <ComponentWrapper>
      <Alert heading="Wij zoeken het adres." />
    </ComponentWrapper>
  );
};

export default LocationLoading;
