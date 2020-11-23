import { Paragraph } from "@amsterdam/asc-ui";
import React from "react";
import { useTranslation } from "react-i18next";

import { Alert, ComponentWrapper } from "../../atoms";
import { sections } from "../../config/matomo";
import { LOCATION_NOT_FOUND } from "../../utils/test-ids";
import PhoneNumber from "../PhoneNumber";

const LocationNotFound: React.FC = () => {
  const { t } = useTranslation();
  return (
    <ComponentWrapper>
      <Alert
        data-testid={LOCATION_NOT_FOUND}
        heading="Helaas. Wij kunnen geen adres vinden bij deze combinatie van postcode en huisnummer."
        level="error"
        outline
        style={{ background: "white" }} // @TODO: This style is a temporary fix, need to fix default white background at @masterdam/asc-ui
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
