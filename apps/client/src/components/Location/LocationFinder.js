import { useQuery } from "@apollo/client";
import { ErrorMessage, Paragraph, TextField } from "@datapunt/asc-ui";
import { loader } from "graphql.macro";
import React, { useEffect, useState } from "react";

import { Alert, ComponentWrapper } from "../../atoms";
import { requiredFieldText } from "../../config";
import { LOCATION_FOUND } from "../../utils/test-ids";
import SuggestList from "../AutoSuggestList";
import RegisterLookupSummary from "../RegisterLookupSummary";
import LocationtLoading from "./LocationLoading";
import LocationNotFound from "./LocationNotFound";

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
  const [autoSuggestValue, setAutoSuggestValue] = useState("");
  const [touched, setTouched] = useState({});
  const [houseNumberInput, setHouseNumberInput] = useState("");
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
  const skip = !houseNumberFull || !postalCode;
  const { loading, error: graphqlError, data } = useQuery(findAddress, {
    variables: skip ? undefined : variables,
    skip,
  });

  const allowToSetAddress = !!(
    houseNumber &&
    houseNumberFull &&
    postalCode &&
    !loading &&
    (data || graphqlError)
  );

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
  const notFoundAddress = !!(
    postalCode &&
    houseNumber &&
    houseNumberFull &&
    !loading &&
    !exactMatch &&
    !graphqlError
  );

  // Validate forms
  const validate = (name, value, required) => {
    if (touched[name]) {
      if (required && (!value || value?.toString().trim() === "")) {
        return requiredFieldText;
      }
      const trimmed = value && value.toString().trim();
      if (name === "postalCode" && !trimmed.match(postalCodeRegex)) {
        return "Dit is geen geldige postcode. Een postcode bestaat uit 4 cijfers en 2 letters.";
      }
    }
  };

  // Error messages
  const postalCodeError = validate("postalCode", postalCode, true);
  const houseNumberError = validate("houseNumber", houseNumber, true);

  const handleBlur = (e) => {
    e.target.value && setTouched({ ...touched, [e.target.name]: true });
    props.setFocus(false);
  };

  // Auto-suggest
  const AbsoluteList = SuggestList;

  const showAutoSuggest =
    data?.findAddress.matches.length > 0 &&
    data?.findAddress.matches[0].houseNumberFull !== houseNumberFull;

  const onSelectOption = (option) => {
    setHouseNumber(option.value);
    setHouseNumberFull(option.value);
    setAutoSuggestValue(option.value);
  };

  const options = data?.findAddress.matches.map((address) => ({
    id: address.houseNumberFull.replace(" ", "-"),
    value: address.houseNumberFull,
  }));

  const displayLocationNotFound = !!notFoundAddress && !showAutoSuggest;

  const showExactMatch = exactMatch && !loading;

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
          error={houseNumberError}
          id="houseNumberFull"
          label="Huisnummer"
          name="houseNumber"
          onBlur={handleBlur}
          onChange={(e) => {
            const numeric = parseInt(e.target.value);
            setHouseNumber(numeric);
            setHouseNumberFull(e.target.value);
          }}
          onFocus={() => props.setFocus(true)}
          onInput={(e) => setHouseNumberInput(e.target.value)}
          required
          value={houseNumberFull || autoSuggestValue}
        />
        {houseNumberError && <ErrorMessage message={houseNumberError} />}
        {showAutoSuggest && (
          <AbsoluteList
            activeIndex={-1}
            id="as-listbox"
            onSelectOption={onSelectOption}
            options={options}
            role="listbox"
          />
        )}
      </ComponentWrapper>

      <LocationtLoading loading={loading} />

      {displayLocationNotFound && (
        <LocationNotFound {...{ houseNumberInput }} />
      )}

      {showExactMatch && (
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
