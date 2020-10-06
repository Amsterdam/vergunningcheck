import { useQuery } from "@apollo/client";
import { ErrorMessage, Paragraph } from "@datapunt/asc-ui";
import { loader } from "graphql.macro";
import React, { useEffect, useState } from "react";

import { Alert, ComponentWrapper } from "../../atoms";
import { requiredFieldText } from "../../config";
import { LOCATION_FOUND } from "../../utils/test-ids";
import AutoSuggestList from "../AutoSuggestList";
import RegisterLookupSummary from "../RegisterLookupSummary";
import LocationLoading from "./LocationLoading";
import LocationNotFound from "./LocationNotFound";
import { LocationTextField } from "./LocationStyles";

const findAddress = loader("./LocationFinder.graphql");
const postalCodeRegex = /^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i;

const LocationFinder = ({
  address,
  errors,
  matomoTrackEvent,
  sessionAddress,
  setAddress,
  setErrorMessage,
  setFocus,
  topic,
}) => {
  const [postalCode, setPostalCode] = useState(sessionAddress?.postalCode);
  const [houseNumber, setHouseNumber] = useState(
    sessionAddress?.houseNumber && parseInt(sessionAddress?.houseNumber)
  );
  const [houseNumberFull, setHouseNumberFull] = useState(
    sessionAddress?.houseNumberFull
  );
  const [autoSuggestValue, setAutoSuggestValue] = useState("");
  const [touched, setTouched] = useState({});
  const [houseNumberInput, setHouseNumberInput] = useState("");

  const variables = {
    extraHouseNumberFull: "",
    houseNumberFull: houseNumberFull,
    postalCode,
    queryExtra: false,
  };

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
  const addressError = errors?.address?.message;
  const houseNumberError = validate("houseNumber", houseNumber, true);
  const postalCodeError = validate("postalCode", postalCode, true);

  /* There is an issue with `skip`, it's not working if variables are given
     in `options` to `useQuery`. See https://github.com/apollographql/react-apollo/issues/3367
     Workaround is not giving any variables if the query should be skipped. */
  const skip = !!(
    houseNumberError ||
    !houseNumberFull ||
    !postalCode ||
    postalCodeError
  );
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

  const handleBlur = (e) => {
    // This fixes the focus error
    e.target.value && setTouched({ ...touched, [e.target.name]: true });
    setFocus(false);
  };

  // AutoSuggest
  const autoSuggestMatches =
    data?.findAddress.matches.filter(
      (a) => a.houseNumberFull !== houseNumberFull
    ) || [];
  const showAutoSuggest = autoSuggestMatches.length > 0;

  const onSelectOption = (option) => {
    setHouseNumber(option.value);
    setHouseNumberFull(option.value);
    setAutoSuggestValue(option.value);
  };

  const options = autoSuggestMatches.map((address) => ({
    id: address.houseNumberFull.replace(" ", "-"),
    value: address.houseNumberFull,
  }));

  const displayLocationNotFound = notFoundAddress && !showAutoSuggest;

  const showExactMatch = exactMatch && !loading;

  return (
    <>
      <ComponentWrapper>
        <LocationTextField
          autoFocus
          defaultValue={postalCode}
          error={postalCodeError}
          label="Postcode"
          name="postalCode"
          onBlur={handleBlur}
          onChange={(e) => {
            setPostalCode(e.target.value);
          }}
          onFocus={() => setFocus(true)}
          required
        />
        {postalCodeError && <ErrorMessage message={postalCodeError} />}
      </ComponentWrapper>

      <ComponentWrapper>
        <LocationTextField
          error={addressError || houseNumberError}
          id="houseNumberFull"
          label="Huisnummer + toevoeging"
          name="houseNumber"
          onBlur={handleBlur}
          onChange={(e) => {
            // @TODO: Fix the option to allow a space between the houseNumber and the suffix
            // EG: houseNumber "762A" should trigger the AutoSuggest and now only "762 A" works (postalCode "1017LD")
            setHouseNumber(parseInt(e.target.value));
            setHouseNumberFull(e.target.value);
          }}
          onFocus={() => setFocus(true)}
          onInput={(e) => setHouseNumberInput(e.target.value)}
          required
          value={houseNumberFull || autoSuggestValue}
        />
        {houseNumberError && <ErrorMessage message={houseNumberError} />}
        {showAutoSuggest && (
          <AutoSuggestList
            // @TODO: make activeIndex dynamic (WCAG)
            activeIndex={-1}
            error={addressError}
            id="as-listbox"
            onSelectOption={onSelectOption}
            options={options}
            role="listbox"
          />
        )}
      </ComponentWrapper>

      <LocationTextField
        error={addressError}
        name="address"
        type="hidden"
        value={address?.id || sessionAddress?.id || ""}
      />
      {addressError && <ErrorMessage message={addressError} />}

      <LocationLoading loading={loading} />

      {displayLocationNotFound && (
        <LocationNotFound {...{ houseNumberInput }} />
      )}

      {showExactMatch && (
        <>
          <ComponentWrapper marginBottom={16}>
            <Alert
              data-testid={LOCATION_FOUND}
              heading="Dit is het gekozen adres:"
              level="attention"
            >
              <RegisterLookupSummary
                addressFromLocation={exactMatch}
                compact
                displayZoningPlans={false}
                matomoTrackEvent={matomoTrackEvent}
                topic={topic}
              />
            </Alert>
          </ComponentWrapper>
          <Paragraph gutterBottom={32}>
            Klopt dit niet? Wijzig dan postcode of huisnummer.
          </Paragraph>
        </>
      )}
    </>
  );
};

export default LocationFinder;
