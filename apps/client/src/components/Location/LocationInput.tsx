import { Heading, Paragraph } from "@amsterdam/asc-ui";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { actions, eventNames, sections } from "../../config/matomo";
import { CheckerContext, SessionContext, SessionDataType } from "../../context";
import withTracking from "../../hoc/withTracking";
import { geturl, routes } from "../../routes";
import Error from "../Error";
import Form from "../Form";
import Nav from "../Nav";
import PhoneNumber from "../PhoneNumber";
import LocationFinder from "./LocationFinder";

const LocationInput: React.FC<{
  matomoTrackEvent: Function;
  resetChecker: Function;
  setActiveState: Function;
  setFinishedState: Function;
  topic: any; // @TODO: replace with custom hooks
}> = ({
  matomoTrackEvent,
  resetChecker,
  setActiveState,
  setFinishedState,
  topic,
}) => {
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
  const [errorMessage, setErrorMessage] = useState<any>([]); // @TODO what is the type of a errorMessage Stack
  const [focus, setFocus] = useState(false);

  const onSubmit = () => {
    if (address?.postalCode) {
      matomoTrackEvent({
        action: actions.CLICK_INTERNAL_NAVIGATION,
        name: `${eventNames.FORWARD} ${
          hasIMTR ? sections.QUESTIONS : sections.LOCATION_RESULT
        }`,
      });

      // Detect if user is submitting the same address as currently stored
      if (sessionAddress.id && sessionAddress.id === address.id) {
        // The address is the same, so go directly to the Questions section
        setActiveState(hasIMTR ? sections.QUESTIONS : sections.LOCATION_RESULT);
        return;
      }

      matomoTrackEvent({
        action: actions.SUBMIT_LOCATION,
        name: address.postalCode.substring(0, 4),
      });

      // Load given answers from sessionContext
      let answers = sessionContext[slug]?.answers;

      // Reset the checker and answers when the address is changed
      if (answers && sessionAddress.id !== address.id) {
        answers = [];
      }

      checkerContext.autofillData.address = address;

      // Reset all previous finished states
      if (hasIMTR) {
        resetChecker();
        setFinishedState([sections.QUESTIONS, sections.CONCLUSION], false);
      }

      sessionContext.setSessionData([
        slug,
        {
          address,
          answers, // Either null or filled with given answers
          questionIndex: 0, // Reset to 0 to start with the first question
        },
      ]);

      if (focus) {
        const e = document.activeElement as HTMLInputElement;
        e.blur();
      } else {
        setFinishedState(sections.LOCATION_INPUT);
        setActiveState(hasIMTR ? sections.QUESTIONS : sections.LOCATION_RESULT);
      }
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
          showPrev
        />
      </Form>
    </>
  );
};

export default withTracking(LocationInput);
