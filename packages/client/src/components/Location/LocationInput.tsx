import { Heading, Paragraph } from "@amsterdam/asc-ui";
import { ApolloError } from "@apollo/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { actions, eventNames, sections } from "../../config/matomo";
import { useTopic, useTopicData, useTracking } from "../../hooks";
import { geturl, routes } from "../../routes";
import { getRestrictionByTypeName } from "../../utils";
import Error from "../Error";
import Form from "../Form";
import Nav from "../Nav";
import PhoneNumber from "../PhoneNumber";
import LocationFinder from "./LocationFinder";
import LocationMap from "./Map";

type LocationInputProps = {
  error?: ApolloError | undefined;
  handleNewAddressSubmit: (address: any) => void;
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

  const { hasIMTR, slug, text } = topic;
  const address = topicData.address || {};
  const [errorMessage, setErrorMessage] = useState<ApolloError | undefined>(
    error
  );

  const [focus, setFocus] = useState(false);

  const onSubmit = () => {
    if (address?.postalCode) {
      const monument = getRestrictionByTypeName(
        address?.restrictions,
        "Monument"
      )?.name;
      const cityScape = getRestrictionByTypeName(
        address?.restrictions,
        "CityScape"
      )?.scope;

      // Save events to Matomo
      matomoTrackEvent({
        action: actions.CLICK_INTERNAL_NAVIGATION,
        name: `${eventNames.FORWARD} ${
          hasIMTR ? sections.QUESTIONS : sections.LOCATION_RESULT
        }`,
      });
      matomoTrackEvent({
        action: actions.SUBMIT_LOCATION,
        name: address.postalCode.substring(0, 4),
      });
      matomoTrackEvent({
        action: actions.SUBMIT_LOCATION,
        name: monument || eventNames.NO_MONUMENT,
      });
      matomoTrackEvent({
        action: actions.SUBMIT_LOCATION,
        name: cityScape || eventNames.NO_CITYSCAPE,
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
  const showMap = true;
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

      {!hasIMTR && (
        <Heading forwardedAs="h3">{t("location.enter location")}</Heading>
      )}
      {text.locationIntro && <Paragraph>{text.locationIntro}.</Paragraph>}

      <Form onSubmit={handleSubmit(onSubmit)}>
        {showMap ? (
          <LocationMap />
        ) : (
          <LocationFinder
            {...{
              focus,
              matomoTrackEvent,
              sessionAddress: address,
              setErrorMessage,
              setFocus,
            }}
          />
        )}
        <Nav
          nextText={hasIMTR ? "Naar de vragen" : "Volgende"}
          noMarginBottom={!hasIMTR}
          onGoToPrev={onGoToPrev}
          showNext
          showPrev={hasIMTR}
        />
      </Form>
    </>
  );
};

export default LocationInput;
