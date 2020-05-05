import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Paragraph, Select } from "@datapunt/asc-ui";
import { loader } from "graphql.macro";

import { requiredFieldText } from "../../config";
import { StyledTextField, StyledAlert } from "./LocationFinderStyles";
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
        return "De ingevoerde postcode is niet goed geformuleerd. Een postcode bestaat uit 4 cijfers en 2 letters.";
      }
    }
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  return (
    <>
      <StyledTextField
        onChange={(e) => {
          setPostalCode(e.target.value);
        }}
        required={true}
        onBlur={handleBlur}
        label="Postcode"
        defaultValue={postalCode}
        name="postalCode"
        errorMessage={validate("postalCode", postalCode, true)}
      />
      <StyledTextField
        label="Huisnummer"
        onChange={(e) => {
          setHouseNumberFull(e.target.value);
          setHouseNumber(e.target.value);
        }}
        required={true}
        onBlur={handleBlur}
        defaultValue={houseNumberFull}
        name="houseNumberFull"
        errorMessage={validate("houseNumberFull", houseNumberFull, true)}
      />

      <Select
        label="Toevoeging"
        name="suffix"
        value={exactMatch?.houseNumberFull}
        onChange={(e) => {
          setHouseNumberFull(e.target.value);
          e.preventDefault();
        }}
        style={{ marginBottom: 35 }}
        errorMessage={!notFoundAddress && props.errors?.suffix?.message}
        disabled={
          notFoundAddress || graphqlError || (exactMatch && !addressMatches)
        }
      >
        {addressMatches && <option value={houseNumber}>Maak een keuze</option>}
        {addressMatches?.map((match) => (
          <option value={match.houseNumberFull} key={match.houseNumberFull}>
            {match.houseNumberFull}
          </option>
        ))}
      </Select>

      {loading && (
        <StyledAlert
          heading="Laden..."
          content="De resultaten worden ingeladen."
        />
      )}

      {notFoundAddress && !graphqlError && (
        <StyledAlert
          heading="Helaas. Wij kunnen geen adres vinden bij uw postcode en huisnummer combinatie. "
          style={{
            backgroundColor: "white",
            border: "2px solid red",
          }}
        >
          <Paragraph>
            Probeer het opnieuw. Of neem contact op met de gemeente op
            telefoonnummer <a href="tel:14020">14 020</a>
          </Paragraph>
        </StyledAlert>
      )}

      {exactMatch && !loading && (
        <>
          <StyledAlert
            data-testid={LOCATION_FOUND}
            level="attention"
            heading="Dit is het gekozen adres:"
          >
            <Paragraph>
              {exactMatch.streetName} {exactMatch.houseNumberFull}
              <br />
              {exactMatch.postalCode} {exactMatch.residence}
            </Paragraph>
          </StyledAlert>
          <Paragraph>
            Klopt dit niet? Wijzig dan postcode of huisnummer.
          </Paragraph>
        </>
      )}
    </>
  );
};

export default LocationFinder;
