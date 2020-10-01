import { Paragraph } from "@datapunt/asc-ui";
import React, { useEffect, useState } from "react";

import { Alert, ComponentWrapper } from "../../atoms";
import { sections } from "../../config/matomo";
import useDebounce from "../../hooks/useDebounce";
import PhoneNumber from "../PhoneNumber";
import LocationtLoader from "./LocationLoading";

type LocationNotFoundProps = {
  houseNumberInput: string;
};

const LocationNotFound: React.FC<LocationNotFoundProps> = ({
  houseNumberInput,
}) => {
  const DELAY_TIME = 750;
  const [error, setError] = useState(false);
  const showError = () => setError(true);
  const debouncedShowError = useDebounce(showError, DELAY_TIME);

  useEffect(() => {
    error && setError(false);
    debouncedShowError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [houseNumberInput]);

  return (
    <>
      {error ? (
        <ComponentWrapper>
          <Alert
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
      ) : (
        <LocationtLoader loading />
      )}
    </>
  );
};

export default LocationNotFound;
