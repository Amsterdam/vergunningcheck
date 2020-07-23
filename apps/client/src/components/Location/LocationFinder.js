import { useQuery } from "@apollo/react-hooks";
import { ErrorMessage, Paragraph, Select, TextField } from "@datapunt/asc-ui";
import { loader } from "graphql.macro";
import React, { useEffect, useState } from "react";

import { Alert, ComponentWrapper } from "../../atoms";
import { requiredFieldText } from "../../config";
import { LOCATION_FOUND } from "../../utils/test-ids";

const findAddress = loader("./LocationFinder.graphql");
const postalCodeRegex = /^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i;

const LocationFinder = (props) => {
  const [postalCode, setPostalCode] = useState(props.postalCode);
  const [houseNumber, setHouseNumber] = useState(props.houseNumber);
  const [houseNumberFull, setHouseNumberFull] = useState(props.houseNumberFull);
  const [touched, setTouched] = useState({});
  const { setAddress, setErrorMessage } = props;

  // GraphQL query
  const { loading, error: graphqlError, data } = useQuery(findAddress, {
    variables: {
      postalCode,
      houseNumberFull,
      extraHouseNumberFull: houseNumber,
      queryExtra: houseNumber !== houseNumberFull,
    },
    skip: !postalCode || !houseNumberFull || !houseNumber,
  });

  // Prevent setState error
  useEffect(() => {
    // Pass the GraphQL error to the HOC
    setErrorMessage(graphqlError);

    if (postalCode && houseNumberFull && !loading && (data || graphqlError)) {
      setAddress(data?.findAddress?.exactMatch);
    }
  });

  const exactMatch = data?.findAddress?.exactMatch;
  const findAddressMatches = data?.findAddress?.matches || [];
  const extraAddressMatches = data?.extraAddress?.matches || [];
  const addressMatches = extraAddressMatches.length
    ? extraAddressMatches
    : findAddressMatches.length > 1
    ? findAddressMatches
    : null;

  // Validate address
  const notFoundAddress =
    postalCode &&
    houseNumber &&
    houseNumberFull &&
    !loading &&
    !exactMatch &&
    !findAddressMatches.length;

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
  const houseNumberError = validate("houseNumberFull", houseNumberFull, true);
  const suffixError = !notFoundAddress && props.errors?.suffix?.message;

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
    props.setFocus(false);
  };

  return (
    <>
      <ComponentWrapper>
        <TextField
          name="postalCode"
          label="Postcode"
          defaultValue={postalCode}
          error={postalCodeError}
          required={true}
          onBlur={handleBlur}
          onFocus={() => props.setFocus(true)}
          onChange={(e) => {
            setPostalCode(e.target.value);
          }}
          autoFocus
        />
        {postalCodeError && <ErrorMessage message={postalCodeError} />}
      </ComponentWrapper>

      <ComponentWrapper>
        <TextField
          name="houseNumberFull"
          label="Huisnummer"
          defaultValue={houseNumberFull}
          error={houseNumberError}
          required={true}
          onBlur={handleBlur}
          onFocus={() => props.setFocus(true)}
          onChange={(e) => {
            setHouseNumberFull(e.target.value);
            setHouseNumber(e.target.value);
          }}
        />
        {houseNumberError && <ErrorMessage message={houseNumberError} />}
      </ComponentWrapper>

      <ComponentWrapper>
        <Select
          name="suffix"
          label="Toevoeging"
          value={exactMatch?.houseNumberFull || houseNumber}
          disabled={
            notFoundAddress || graphqlError || (exactMatch && !addressMatches)
          }
          error={suffixError}
          onChange={(e) => {
            e.target.value && setHouseNumberFull(e.target.value);
            e.preventDefault();
          }}
        >
          {addressMatches && (
            <option value={houseNumber}>Maak een keuze</option>
          )}
          {addressMatches?.map((match) => (
            <option value={match.houseNumberFull} key={match.houseNumberFull}>
              {match.houseNumberFull}
            </option>
          ))}
        </Select>
        {suffixError && <ErrorMessage message={suffixError} />}
      </ComponentWrapper>

      {loading && (
        <ComponentWrapper>
          <Alert heading="Laden..." content="De resultaten worden ingeladen." />
        </ComponentWrapper>
      )}

      {notFoundAddress && !graphqlError && (
        <ComponentWrapper>
          <Alert
            level="warning"
            heading="Helaas. Wij kunnen geen adres vinden bij deze combinatie van postcode en huisnummer."
          >
            <Paragraph>
              Probeer het opnieuw. Of neem contact op met de gemeente op
              telefoonnummer <a href="tel:14020">14 020</a>.
            </Paragraph>
          </Alert>
        </ComponentWrapper>
      )}

      {exactMatch && !loading && (
        <>
          <ComponentWrapper marginBottom={36}>
            <Alert
              data-testid={LOCATION_FOUND}
              level="attention"
              heading="Dit is het gekozen adres:"
            >
              <Paragraph>
                {exactMatch.streetName} {exactMatch.houseNumberFull}
                <br />
                {exactMatch.postalCode} {exactMatch.residence}
              </Paragraph>
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
