import { Paragraph } from "@amsterdam/asc-ui";
import React from "react";

import { Alert, ComponentWrapper } from "../../atoms";
import { sections } from "../../config/matomo";
import { LOCATION_NOT_FOUND } from "../../utils/test-ids";
import PhoneNumber from "../PhoneNumber";

const LocationNotFound: React.FC = () => {
  return (
    <ComponentWrapper>
      <Alert
        data-testid={LOCATION_NOT_FOUND}
        heading="Helaas. Wij kunnen geen adres vinden bij deze combinatie van postcode en huisnummer."
        level="warning"
      >
        <Paragraph>
          Probeer het opnieuw. Of neem contact op met de gemeente op
          telefoonnummer{" "}
          <PhoneNumber eventName={sections.ALERT_ADDRESS_NOT_FOUND} />.
        </Paragraph>
      </Alert>
    </ComponentWrapper>
  );
};

export default LocationNotFound;
