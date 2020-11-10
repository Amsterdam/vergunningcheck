import {Heading, Paragraph} from "@amsterdam/asc-ui";
import { ApolloError } from "@apollo/client";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {useTranslation} from "react-i18next";

import { Topic } from "../../config";
import { actions, eventNames, sections } from "../../config/matomo";
import { CheckerContext, SessionContext, SessionDataType } from "../../context";
import withTracking, { MatomoTrackEventProps } from "../../hoc/withTracking";
import { geturl, routes } from "../../routes";
import { getRestrictionByTypeName } from "../../utils";
import Error from "../Error";
import Form from "../Form";
import Nav from "../Nav";
import PhoneNumber from "../PhoneNumber";
import LocationFinder from "./LocationFinder";

type LocationInputProps = {
  error?: ApolloError | undefined;
  handleNewAddressSubmit: () => void;
  topic: Topic;
};
const LocationInput: React.FC<LocationInputProps & MatomoTrackEventProps> = ({
  error,
  handleNewAddressSubmit,
  matomoTrackEvent,
  topic,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { handleSubmit } = useForm();
  // @TODO: replace with custom topic hooks
  const sessionContext = useContext<SessionDataType & { setSessionData?: any }>(
    SessionContext
  );
  const checkerContext = useContext(CheckerContext);

  const { hasIMTR, slug, text } = topic;
  const sessionAddress = sessionContext[slug]?.address || {};

  const [address, setAddress] = useState(sessionAddress);
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
      matomoTrackEvent({
        action: actions.SUBMIT_LOCATION,
        name: address.neighborhoodName || t("common.unknown"),
      });
      matomoTrackEvent({
        action: actions.SUBMIT_LOCATION,
        name: address.neighborhoodName || t("common.unknown"),
      });

      // Store the data
      sessionContext.setSessionData([
        slug,
        {
          address,
        },
      ]);
      checkerContext.autofillData.address = address;

      handleNewAddressSubmit();
    }
  };

  const onGoToPrev = () => {
    matomoTrackEvent({
      action: actions.CLICK_INTERNAL_NAVIGATION,
      name: `${eventNames.BACK} ${sections.INTRO}`,
    });

    // Only store the address if the address has been found, otherwise an empty address may overwrite an existing address
    if (address) {
      sessionContext.setSessionData([
        slug,
        {
          address,
        },
      ]);
    }
    history.push(geturl(routes.intro, topic));
  };

  return (
    <>
      {errorMessage && (
        <Error
          heading={t("common.no address found api down")}
          stack={errorMessage?.stack}
        >
          <Paragraph>
            {t("common.try again or contact city of amsterdam")}{" "}
            <PhoneNumber eventName={sections.ALERT_LOCATION_INPUT} />.
          </Paragraph>
        </Error>
      )}

      {!hasIMTR && <Heading forwardedAs="h3">Invullen adres</Heading>}
      {text.locationIntro && <Paragraph>{text.locationIntro}.</Paragraph>}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <LocationFinder
          {...{
            errorMessage,
            focus,
            matomoTrackEvent,
            sessionAddress,
            setAddress,
            setErrorMessage,
            setFocus,
            topic,
          }}
        />
        <Nav
          nextText={hasIMTR ? t("common.to the questions") : t("common.next")}
          noMarginBottom={!hasIMTR}
          onGoToPrev={onGoToPrev}
          showNext
          showPrev={hasIMTR}
        />
      </Form>
    </>
  );
};

export default withTracking(LocationInput);
