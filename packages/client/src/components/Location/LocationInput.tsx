import { Heading, Paragraph } from "@amsterdam/asc-ui";
import { ApolloError } from "@apollo/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { actions, eventNames, sections } from "../../config/matomo";
import { useTopic, useTopicData, useTracking } from "../../hooks";
import { geturl, routes } from "../../routes";
import { Address } from "../../types";
import { getRestrictionByTypeName, hasIMTR } from "../../utils";
import { LOCATION_INPUT } from "../../utils/test-ids";
import Error from "../Error";
import Form from "../Form";
import Nav from "../Nav";
import PhoneNumber from "../PhoneNumber";
import LocationFinder from "./LocationFinder";

type LocationInputProps = {
  error?: ApolloError | undefined;
  handleNewAddressSubmit: (address: Address) => void;
};

const LocationInput = ({
  error,
  handleNewAddressSubmit,
}: LocationInputProps) => {
  const topic = useTopic();
  const history = useHistory();
  const { matomoTrackEvent } = useTracking();
  const { handleSubmit } = useForm();
  const { topicData, setTopicData } = useTopicData();
  const { t } = useTranslation();

  const { slug, text } = topic;
  const { address } = topicData;
  const [errorMessage, setError] = useState<ApolloError | undefined>(error);
  const [focus, setFocus] = useState(false);

  const onSubmit = () => {
    if (address?.postalCode) {
      const monument = getRestrictionByTypeName(
        address.restrictions,
        "Monument"
      )?.name;
      const cityScape = getRestrictionByTypeName(
        address.restrictions,
        "CityScape"
      )?.scope;

      // Save events to Matomo
      matomoTrackEvent({
        action: actions.CLICK_INTERNAL_NAVIGATION,
        name: `${eventNames.FORWARD} ${
          // @TODO: there's a small bug here with directly going to OUTCOME when there's no questions to render
          hasIMTR(topic) ? sections.QUESTIONS : sections.LOCATION_RESULT
        }`,
      });
      matomoTrackEvent({
        action: actions.SUBMIT_LOCATION,
        name: address.postalCode.substring(0, 4),
      });
      matomoTrackEvent({
        action: actions.SUBMIT_MONUMENT,
        name: monument || eventNames.NO_MONUMENT,
      });
      matomoTrackEvent({
        action: actions.SUBMIT_CITYSCAPE,
        name: cityScape || eventNames.NO_CITYSCAPE,
      });
      matomoTrackEvent({
        action: actions.SUBMIT_NEIGHBORHOOD,
        name: address.neighborhoodName || t("common.unknown"),
      });
      matomoTrackEvent({
        action: actions.SUBMIT_DISTRICT,
        name: address.districtName || t("common.unknown"),
      });

      handleNewAddressSubmit(address);
    }
  };

  const onGoToPrev = () => {
    matomoTrackEvent({
      action: actions.CLICK_INTERNAL_NAVIGATION,
      name: `${eventNames.BACK} ${sections.INTRO}`,
    });

    // Only store the address if the address has been found, otherwise an empty address may overwrite an existing address
    if (address) {
      setTopicData({
        address,
      });
    }
    history.push(geturl(routes.intro, { slug }));
  };

  return (
    <>
      {errorMessage && (
        <Error
          heading={t(
            "errorMessages.unfortunately we cannot get address results"
          )}
          stack={errorMessage?.stack}
        >
          <Paragraph>
            {t("errorMessages.please try again later or contact the city on")}{" "}
            <PhoneNumber eventName={sections.ALERT_LOCATION_INPUT} />.
          </Paragraph>
        </Error>
      )}

      {!hasIMTR(topic) && (
        <Heading forwardedAs="h3">
          {t("location.address.enter address")}
        </Heading>
      )}
      {text.locationIntro && <Paragraph>{text.locationIntro}.</Paragraph>}

      <Form dataTestId={LOCATION_INPUT} onSubmit={handleSubmit(onSubmit)}>
        <LocationFinder
          {...{
            errorMessage,
            focus,
            matomoTrackEvent,
            sessionAddress: address,
            setError,
            setFocus,
          }}
        />
        <Nav
          nextText={
            hasIMTR(topic) ? t("common.to the questions") : t("common.next")
          }
          noMarginBottom={!hasIMTR(topic)}
          onGoToPrev={onGoToPrev}
          showNext
          showPrev={hasIMTR(topic)}
        />
      </Form>
    </>
  );
};

export default LocationInput;
