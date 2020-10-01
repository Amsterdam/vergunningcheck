import { useQuery } from "@apollo/client";
import { ErrorMessage, Paragraph, TextField } from "@datapunt/asc-ui";
import { loader } from "graphql.macro";
import React, { useEffect, useState } from "react";

import { Alert, ComponentWrapper } from "../../atoms";
import { requiredFieldText } from "../../config";
import { sections } from "../../config/matomo";
import { LOCATION_FOUND } from "../../utils/test-ids";
import PhoneNumber from "../PhoneNumber";
import RegisterLookupSummary from "../RegisterLookupSummary";

const findAddress = loader("./LocationFinder.graphql");
const postalCodeRegex = /^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i;

const LocationFinder = (props) => {
  const [postalCode, setPostalCode] = useState(props.address.postalCode);
  // Temporary solution until we upgrade GraphQL
  const [houseNumber, setHouseNumber] = useState(
    props.address.houseNumber && parseInt(props.address.houseNumber)
  );
  const [houseNumberFull, setHouseNumberFull] = useState(
    props.address.houseNumberFull
  );
  const [suffix, setSuffix] = useState("");
  const [touched, setTouched] = useState({});
  const { setAddress, setErrorMessage } = props;

  const variables = {
    extraHouseNumberFull: "",
    houseNumberFull: houseNumberFull,
    postalCode,
    queryExtra: false,
  };

  /* There is an issue with `skip`, it's not working if variables are given
     in `options` to `useQuery`. See https://github.com/apollographql/react-apollo/issues/3367
     Workaround is not giving any variables if the query should be skipped. */
  const skip = !houseNumberFull && !postalCode;
  const { loading, error: graphqlError, data } = useQuery(findAddress, {
    variables: skip ? undefined : variables,
    skip,
  });

  const allowToSetAddress =
    houseNumber &&
    houseNumberFull &&
    postalCode &&
    !loading &&
    (data || graphqlError);

  // Prevent setState error
  useEffect(() => {
    // Pass the GraphQL error to the HOC
    setErrorMessage(graphqlError);

    if (allowToSetAddress) {
      setAddress(data?.findAddress?.exactMatch);
    }
  }, [allowToSetAddress, data, graphqlError, setAddress, setErrorMessage]);

  const exactMatch = data?.findAddress?.exactMatch;

  // Validate address
  const notFoundAddress =
    postalCode && houseNumber && houseNumberFull && !loading && !exactMatch;

  // Validate forms
  const validate = (name, value, required) => {
    if (touched[name]) {
      if (required && (!value || value?.trim() === "")) {
        return requiredFieldText;
      }
      const trimmed = value?.trim();
      if (name === "postalCode" && !trimmed.match(postalCodeRegex)) {
        return "Dit is geen geldige postcode. Een postcode bestaat uit 4 cijfers en 2 letters.";
      }
    }
  };

  // Error messages
  const postalCodeError = validate("postalCode", postalCode, true);
  const houseNumberError = validate("houseNumber", houseNumber, true);

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
    props.setFocus(false);
  };

  return (
    <>
      <ComponentWrapper>
        <TextField
          autoFocus
          defaultValue={postalCode}
          error={postalCodeError}
          label="Postcode"
          name="postalCode"
          onBlur={handleBlur}
          onChange={(e) => {
            setPostalCode(e.target.value);
          }}
          onFocus={() => props.setFocus(true)}
          required
        />
        {postalCodeError && <ErrorMessage message={postalCodeError} />}
      </ComponentWrapper>

      <ComponentWrapper>
        <TextField
          defaultValue={houseNumber}
          error={houseNumberError}
          label="Huisnummer"
          name="houseNumber"
          onBlur={handleBlur}
          onChange={(e) => {
            setHouseNumber(e.target.value);
            setHouseNumberFull(e.target.value + suffix);
          }}
          onFocus={() => props.setFocus(true)}
          required
          type="number"
        />
        {houseNumberError && <ErrorMessage message={houseNumberError} />}
      </ComponentWrapper>

      <ComponentWrapper>
        <TextField
          // Temporary solution until we upgrade GraphQL
          defaultValue={
            houseNumberFull && houseNumberFull.replace(houseNumber, "")
          }
          label="Toevoeging"
          name="suffix"
          onBlur={handleBlur}
          onChange={(e) => {
            setSuffix(e.target.value);
            setHouseNumberFull(houseNumber + e.target.value);
          }}
          onFocus={() => props.setFocus(true)}
        />
      </ComponentWrapper>

      {loading && (
        <ComponentWrapper>
          <Alert content="Wij zoeken het adres." heading="Laden..." />
        </ComponentWrapper>
      )}

      {notFoundAddress && !graphqlError && (
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
      )}

      {exactMatch && !loading && (
        <>
          <ComponentWrapper marginBottom={36}>
            <Alert
              data-testid={LOCATION_FOUND}
              heading="Dit is het gekozen adres:"
              level="attention"
            >
              <RegisterLookupSummary
                addressFromLocation={exactMatch}
                compact={true}
                displayZoningPlans={false}
                matomoTrackEvent={props.matomoTrackEvent}
                topic={props.topic}
              />
            </Alert>
          </ComponentWrapper>
          <Paragraph>
            Klopt dit niet? Wijzig dan postcode of huisnummer.
          </Paragraph>
        </>
      )}
    </>
  );
};

export default LocationFinder;
