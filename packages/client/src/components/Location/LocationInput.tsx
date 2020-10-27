import { Heading, Paragraph } from "@amsterdam/asc-ui";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { Topic } from "../../config";
import { actions, eventNames, sections } from "../../config/matomo";
import { CheckerContext, SessionContext, SessionDataType } from "../../context";
import withTracking from "../../hoc/withTracking";
import { geturl, routes } from "../../routes";
import { getRestrictionByTypeName } from "../../utils";
import Error from "../Error";
import Form from "../Form";
import Nav from "../Nav";
import PhoneNumber from "../PhoneNumber";
import LocationFinder from "./LocationFinder";

type ErrorMessage = {
  stack?: object;
};
const LocationInput: React.FC<{
  error?: ErrorMessage;
  handleNewAddressSubmit: Function;
  matomoTrackEvent: Function;
  topic: Topic; // @TODO: Replace it with react hook
}> = ({ error, handleNewAddressSubmit, matomoTrackEvent, topic }) => {
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
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | undefined>(
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
            sessionAddress,
            setAddress,
            setErrorMessage,
            setFocus,
            topic,
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

export default withTracking(LocationInput);
