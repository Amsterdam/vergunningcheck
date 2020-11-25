import { Paragraph } from "@amsterdam/asc-ui";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import PhoneNumber from "../PhoneNumber";
import { Alert, ComponentWrapper } from "../../atoms";
import { actions, eventNames, sections } from "../../config/matomo";
import { LOCATION_NOT_FOUND } from "../../utils/test-ids";
import { MatomoTrackEventProps } from "../../hoc/withTracking";

const LocationNotFound: React.FC<MatomoTrackEventProps> = ({ matomoTrackEvent }) => {
  const { t } = useTranslation();
  useEffect(() => {
    matomoTrackEvent({
      action: actions.ERROR,
      name: eventNames.ADDRESS_NOT_FOUND,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ComponentWrapper>
      <Alert
        data-testid={LOCATION_NOT_FOUND}
        heading={t("common.no address found postalcode houseNumber combination")}
        level="warning"
      >
        <Paragraph>
          {t("common.try again or contact city of amsterdam")}{" "}
          <PhoneNumber eventName={sections.ALERT_ADDRESS_NOT_FOUND} />.
        </Paragraph>
      </Alert>
    </ComponentWrapper>
  );
};

export default LocationNotFound;
