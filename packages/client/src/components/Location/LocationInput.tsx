import { Heading, Paragraph } from "@amsterdam/asc-ui";
import { ApolloError } from "@apollo/client";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { CheckerContext } from "../../CheckerContext";
import { actions, eventNames, sections } from "../../config/matomo";
import { useTopic, useTopicData, useTracking } from "../../hooks";
import { geturl, routes } from "../../routes";
import { getRestrictionByTypeName } from "../../utils";
import Error from "../Error";
import Form from "../Form";
import Nav from "../Nav";
import PhoneNumber from "../PhoneNumber";
import LocationFinder from "./LocationFinder";

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
  const checkerContext = useContext(CheckerContext);
  const { matomoTrackEvent } = useTracking();
  const { handleSubmit } = useForm();
  const { topicData, setTopicData } = useTopicData();

  const { hasIMTR, slug, text } = topic;
  const address = topicData.address || {};
  const [errorMessage, setErrorMessage] = useState<ApolloError | undefined>(
    error
  );
  // const setAddress = (address: any) => {
  //   setTopicData({ address });
  // };

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

      // Store the data
      // console.log(setTopicData, {
      //   address,
      // });
      // debugger;
      // setTopicData({
      //   address,
      // });
      checkerContext.autofillData.address = address;

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
          heading="Helaas. Wij kunnen nu geen adresgegevens opvragen waardoor u deze check op dit moment niet kunt doen."
          stack={errorMessage?.stack}
        >
          <Paragraph>
            Probeer het later opnieuw. Of neem contact op met de gemeente op
            telefoonnummer{" "}
            <PhoneNumber eventName={sections.ALERT_LOCATION_INPUT} />.
          </Paragraph>
        </Error>
      )}

      {!hasIMTR && <Heading forwardedAs="h3">Invullen adres</Heading>}
      {text.locationIntro && <Paragraph>{text.locationIntro}.</Paragraph>}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <LocationFinder
          {...{
            focus,
            matomoTrackEvent,
            sessionAddress: address,
            setErrorMessage,
            setFocus,
          }}
        />
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
