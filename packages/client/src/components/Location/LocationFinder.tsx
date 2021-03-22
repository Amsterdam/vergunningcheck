import { ErrorMessage, Paragraph } from "@amsterdam/asc-ui";
import { ApolloError, useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

import { Alert, ComponentWrapper, Loading } from "../../atoms";
import { actions, eventNames } from "../../config/matomo";
import { useDebounce, useTopicData, useTracking } from "../../hooks";
import { Address } from "../../types";
import {
  isValidPostalcode,
  sanitizeHouseNumberFull,
  stripString,
} from "../../utils";
import { LOCATION_FOUND } from "../../utils/test-ids";
import AutoSuggestList, { Option } from "../AutoSuggestList";
import LocationNotFound from "./LocationNotFound";
import { LocationTextField } from "./LocationStyles";
import LocationSummary from "./LocationSummary";

const findAddress = loader("./LocationFinder.graphql");

// This is the delay time in ms. that the loading message is displayed
const RESULT_DELAY = 1000;

// This makes sure the exactMatch is equal to the user input
const isTrueExactMatch = (
  match?: { houseNumberFull?: string },
  houseNumberFull?: string
) =>
  !!(
    houseNumberFull &&
    stripString(match?.houseNumberFull) === stripString(houseNumberFull)
  );

type LocationFinderProps = {
  errorMessage?: ApolloError;
  sessionAddress: Address;
  setError: (error: ApolloError | undefined) => void;
};

const LocationFinder: FunctionComponent<LocationFinderProps> = ({
  errorMessage,
  sessionAddress,
  setError,
}) => {
  const isMountedRef = useRef(true);
  const { matomoTrackEvent } = useTracking();
  const { setTopicData } = useTopicData();
  const { t } = useTranslation();
  const [showResult, setShowResult] = useState<boolean>(true);
  const [postalCode, setPostalCode] = useState<string | undefined>(
    sessionAddress?.postalCode
  );
  const [houseNumber, setHouseNumber] = useState<number | undefined>(
    sessionAddress?.houseNumber
  );
  const [houseNumberFull, setHouseNumberFull] = useState<string | undefined>(
    sessionAddress?.houseNumberFull
  );
  const [postalCodeError, setPostalCodeError] = useState<string>("");
  const [houseNumberError, setHouseNumberError] = useState<string>("");
  const [autoSuggestValue, setAutoSuggestValue] = useState<string>("");
  const [focus, setFocus] = useState<boolean>(false);

  const checkPostalCodeErrors = () => {
    setPostalCodeError(
      postalCode && !isValidPostalcode(postalCode)
        ? t("common.no valid postalcode")
        : ""
    );
  };
  const checkHouseNumberErrors = () => {
    setHouseNumberError(
      houseNumber?.toString().trim() === ""
        ? t("common.required field text")
        : ""
    );
  };

  useEffect(
    () => () => {
      // Detect if the component unmounts
      isMountedRef.current = false;
    },
    []
  );

  useEffect(() => {
    checkPostalCodeErrors();
    checkHouseNumberErrors();
    // eslint-disable-next-line
  }, []);

  // Graphql expects the `houseNumberFull` and `postalCode` are defined and for performance `postalCode` should be validated
  const readyForQuery = !!(houseNumberFull && isValidPostalcode(postalCode));
  const variables = {
    extraHouseNumberFull: "",
    houseNumberFull: sanitizeHouseNumberFull(houseNumberFull),
    postalCode,
    queryExtra: false,
  };

  const { loading, error: graphqlError, data } = useQuery(findAddress, {
    skip: !readyForQuery,
    variables,
  });

  const exactMatch = data?.findAddress?.exactMatch;

  // Make sure the exactMatch is equal to the user input
  const isExactMatch = isTrueExactMatch(exactMatch, houseNumberFull);

  const allowToSetAddress = !!(
    houseNumber &&
    readyForQuery &&
    !loading &&
    (data || graphqlError)
  );

  // Prevent setState error
  useEffect(() => {
    // Only `setTopicData` if this component is mounted
    if (allowToSetAddress && isMountedRef) {
      setTopicData({ address: exactMatch });
    }
    // eslint-disable-next-line
  }, [allowToSetAddress, exactMatch, isMountedRef]);

  // Handle graphql errors
  useEffect(() => {
    if (graphqlError && errorMessage?.message !== graphqlError?.message) {
      setError(graphqlError);

      matomoTrackEvent({
        action: actions.ERROR,
        name: eventNames.ADDRESS_API_DOWN,
      });
    } else if (data && errorMessage && !graphqlError) {
      // Reset old error (sometimes graphql errors resolve after retrying another address)
      setError(undefined);
    }
    // eslint-disable-next-line
  }, [data, errorMessage, graphqlError]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter") {
        if (allowToSetAddress) {
          setTopicData({ address: exactMatch });
        } else {
          event.preventDefault();
          (document.activeElement as HTMLElement).blur();
        }
        // Lose focus
        setFocus(false);
      }

      // Reset the autoSuggestValue on each keyDown to make sure the autoSuggestList is reset
      setAutoSuggestValue("");
    },
    // eslint-disable-next-line
    [allowToSetAddress, exactMatch]
  );

  // AutoSuggest
  const handleAutoSuggestSelect = (option: Option) => {
    const { value } = option;
    setShowResult(false);
    debouncedUpdateResult();

    setHouseNumber(parseInt(value));
    setHouseNumberFull(value);
    setAutoSuggestValue(value);
  };
  const autoSuggestMatches =
    data?.findAddress.matches.filter(
      (a: { houseNumberFull: string }) =>
        stripString(a.houseNumberFull) !== stripString(houseNumberFull)
    ) || [];
  const showAutoSuggest = autoSuggestMatches.length > 0 && focus;

  const options = autoSuggestMatches.map(
    (address: { houseNumberFull: string }) => ({
      id: address.houseNumberFull.replace(" ", "-"),
      value: address.houseNumberFull,
    })
  );

  // Determine when to show components
  const showExactMatch = isExactMatch && !loading && !graphqlError;

  const showLocationNotFound = !!(
    readyForQuery &&
    showResult &&
    !isExactMatch &&
    !loading &&
    !graphqlError &&
    !showAutoSuggest
  );

  const showLoading =
    !!(
      readyForQuery &&
      !errorMessage &&
      !showAutoSuggest &&
      !showExactMatch &&
      !showLocationNotFound &&
      !showResult
    ) || loading;
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

      if (value && !errorMessage) {
        // Allow references to the event to be retained
        event.persist();
        setShowResult(false);
        debouncedUpdateResult();
      }
    },
    [debouncedUpdateResult, errorMessage]
  );

  return (
    <>
      <ComponentWrapper>
        <LocationTextField
          autoFocus={!postalCode}
          defaultValue={postalCode}
          error={!!(postalCode && postalCodeError) || showLocationNotFound}
          label={t("common.postalcode label")}
          name="postalCode"
          onBlur={() => {
            checkPostalCodeErrors();
            setFocus(false);
          }}
          onChange={(e) => {
            setPostalCode(e.target.value);
            // Clear error in case
            if (isValidPostalcode(e.target.value)) {
              setPostalCodeError("");
            }
          }}
          onFocus={() => setFocus(true)}
          onKeyDown={handleKeyDown}
          required
          spellCheck={false}
        />
        {postalCodeError && <ErrorMessage message={postalCodeError} />}
      </ComponentWrapper>

      <ComponentWrapper>
        <LocationTextField
          autoComplete="off" // This disables the native browser auto-suggest
          error={!!houseNumberError || showLocationNotFound}
          id="houseNumberFull"
          label={t("common.housenumber label")}
          name="houseNumberFull"
          onBlur={() => {
            checkHouseNumberErrors();
            setFocus(false);
          }}
          onChange={handleChange}
          onFocus={() => setFocus(true)}
          onKeyDown={handleKeyDown}
          required
          spellCheck={false}
          value={houseNumberFull || autoSuggestValue}
        />

        {houseNumberError && <ErrorMessage message={houseNumberError} />}

        {showAutoSuggest && (
          <AutoSuggestList
            activeIndex={-1}
            onSelectOption={handleAutoSuggestSelect}
            options={options}
            role="listbox"
          />
        )}
      </ComponentWrapper>

      {showLoading && <Loading message={t("common.address loading")} />}

      {showLocationNotFound && <LocationNotFound />}

      {showExactMatch && (
        <>
          <ComponentWrapper marginBottom={16}>
            <Alert data-testid={LOCATION_FOUND} level="info">
              <Paragraph gutterBottom={8} strong>
                {t("common.this is the chosen address")}:
              </Paragraph>
              <LocationSummary
                addressFromLocation={exactMatch}
                isBelowInputFields
                showTitle
              />
            </Alert>
          </ComponentWrapper>
          <Paragraph gutterBottom={32}>
            {t(
              "common.if this is not the correct address then change the input"
            )}
          </Paragraph>
        </>
      )}
    </>
  );
};

export default LocationFinder;
