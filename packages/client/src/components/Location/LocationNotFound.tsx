import { Paragraph } from "@amsterdam/asc-ui";
import React, { FunctionComponent, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Alert, ComponentWrapper, PhoneNumber } from "../../atoms";
import { actions, eventNames, sections } from "../../config/matomo";
import { useTracking } from "../../hooks";
import { LOCATION_NOT_FOUND } from "../../utils/test-ids";

const LocationNotFound: FunctionComponent = () => {
  const { matomoTrackEvent } = useTracking();
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
        heading={t(
          "errorMessages.no address found postalcode houseNumber combination"
        )}
        level="error"
        outline
        style={{ background: "white" }} // @TODO: This style is a temporary fix, need to fix default white background at @masterdam/asc-ui
      >
        <Paragraph>
          {t("errorMessages.please try again later or contact the city on")}{" "}
          <PhoneNumber eventName={sections.ALERT_ADDRESS_NOT_FOUND} />.
        </Paragraph>
      </Alert>
    </ComponentWrapper>
  );
};

export default LocationNotFound;
