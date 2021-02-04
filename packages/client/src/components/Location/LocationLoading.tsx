import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { Alert, ComponentWrapper } from "../../atoms";

type LocationLoadingProps = {
  loading: boolean;
};

const LocationLoading: FunctionComponent<LocationLoadingProps> = ({
  loading,
}) => {
  const { t } = useTranslation();
  if (!loading) return null;
  return (
    <ComponentWrapper>
      <Alert heading={t("common.address loading")} />
    </ComponentWrapper>
  );
};

export default LocationLoading;
