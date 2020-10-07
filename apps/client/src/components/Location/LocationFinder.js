import { ErrorMessage, Paragraph } from "@amsterdam/asc-ui";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import React, { useCallback, useEffect, useState } from "react";

import { Alert, ComponentWrapper } from "../../atoms";
import { requiredFieldText } from "../../config";
import useDebounce from "../../hooks/useDebounce";
import { stripString } from "../../utils";
import { LOCATION_FOUND } from "../../utils/test-ids";
import AutoSuggestList from "../AutoSuggestList";
import RegisterLookupSummary from "../RegisterLookupSummary";
import LocationLoading from "./LocationLoading";
import LocationNotFound from "./LocationNotFound";
import { LocationTextField } from "./LocationStyles";

const findAddress = loader("./LocationFinder.graphql");
const postalCodeRegex = /^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i;

const RESULT_DELAY = 750;

const LocationFinder = ({
  focus,
  matomoTrackEvent,
  sessionAddress,
  setAddress,
  setErrorMessage,
  setFocus,
  topic,
}) => {
  const [showResult, setShowResult] = useState(true);
  const [postalCode, setPostalCode] = useState(sessionAddress?.postalCode);
  const [houseNumber, setHouseNumber] = useState(
    sessionAddress?.houseNumber && parseInt(sessionAddress?.houseNumber)
  );
  const [houseNumberFull, setHouseNumberFull] = useState(
    sessionAddress?.houseNumberFull
  );
  const [autoSuggestValue, setAutoSuggestValue] = useState("");
  const [touched, setTouched] = useState({});

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
  const houseNumberError = validate("houseNumber", houseNumber, true);
  const postalCodeError = validate("postalCode", postalCode, true);

  // Handle all the keys
  const handleKeyDown = useCallback(
    (event) => {
      switch (event.key) {
        case "Enter":
          // Prevent submitting the form when pressing Enter
          event.preventDefault();
          // Disable focus on the input so the AutoSugest list disappears
          document.activeElement.blur();
          setFocus(false);
          break;

        default:
          break;
      }
    },
    [setFocus]
  );

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

  const exactMatch = data?.findAddress?.exactMatch;

  // Prevent setState error
  useEffect(() => {
    setErrorMessage(graphqlError);

    if (allowToSetAddress) {
      setAddress(exactMatch);
    }
  }, [
    allowToSetAddress,
    exactMatch,
    graphqlError,
    setAddress,
    setErrorMessage,
  ]);

  const handleBlur = (e) => {
    // This fixes the focus error
    e.target.value && setTouched({ ...touched, [e.target.name]: true });
    setFocus(false);
  };

  // AutoSuggest
  const handleAutoSuggestSelect = (option) => {
    const { value } = option;
    setShowResult(false);
    debouncedUpdateResult();

    setHouseNumber(value);
    setHouseNumberFull(value);
    setAutoSuggestValue(value);
  };
  const autoSuggestMatches =
    data?.findAddress.matches.filter(
      (a) => stripString(a.houseNumberFull) !== stripString(houseNumberFull)
    ) || [];
  const showAutoSuggest = !!(autoSuggestMatches.length > 0 && focus);

  const options = autoSuggestMatches.map((address) => ({
    id: address.houseNumberFull.replace(" ", "-"),
    value: address.houseNumberFull,
  }));

  // Determine when to show components
  const showExactMatch = exactMatch && !loading;

  const showLocationNotFound = !!(
    houseNumberFull &&
    postalCode &&
    showResult &&
    !exactMatch &&
    !loading &&
    !graphqlError &&
    !showAutoSuggest
  );

  const showLoading = !!(
    houseNumberFull &&
    postalCode &&
    !showAutoSuggest &&
    !showExactMatch &&
    !showLocationNotFound &&
    !showResult
  );

  // Debounce showing the LocationNotFound component
  const updateResult = useCallback(() => {
    setShowResult(true);
  }, []);

  const debouncedUpdateResult = useDebounce(updateResult, RESULT_DELAY);

  const handleChange = useCallback(
    (event) => {
      const { value } = event.target;
      setHouseNumber(parseInt(value));
      setHouseNumberFull(value);

      if (value) {
        // Allow references to the event to be retained
        event.persist();
        setShowResult(false);
        debouncedUpdateResult();
      }
    },
    [debouncedUpdateResult]
  );

  // @TODO: we can refactor this component by separating all inputs and input handles

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
          autoComplete="off" // This disables the native browser auto-suggest
          error={houseNumberError}
          id="houseNumberFull"
          label="Huisnummer + toevoeging"
          name="houseNumber"
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={() => setFocus(true)}
          onKeyDown={(e) => handleKeyDown(e)}
          required
          value={houseNumberFull || autoSuggestValue}
        />

        {houseNumberError && <ErrorMessage message={houseNumberError} />}

        {showAutoSuggest && (
          <AutoSuggestList
            // @TODO: make activeIndex dynamic (WCAG)
            activeIndex={-1}
            id="as-listbox"
            onSelectOption={handleAutoSuggestSelect}
            options={options}
            role="listbox"
          />
        )}
      </ComponentWrapper>

      <LocationLoading loading={showLoading} />

      {showLocationNotFound && <LocationNotFound />}

      {showExactMatch && (
        <>
          <ComponentWrapper marginBottom={16}>
            <Alert data-testid={LOCATION_FOUND} level="attention">
              <Paragraph gutterBottom={8} strong>
                Dit is het gekozen adres:
              </Paragraph>
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
