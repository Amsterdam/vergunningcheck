import { Heading, Paragraph } from "@datapunt/asc-ui";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { actions, eventNames, sections } from "../../config/matomo";
import { CheckerContext, SessionContext } from "../../context";
import withTracking from "../../hoc/withTracking";
import { geturl, routes } from "../../routes";
import Error from "../Error";
import Form from "../Form";
import Nav from "../Nav";
import PhoneNumber from "../PhoneNumber";
import LocationFinder from "./LocationFinder";

const LocationInput = ({
  matomoTrackEvent,
  resetChecker,
  setActiveState,
  setFinishedState,
  topic,
}) => {
  const history = useHistory();
  const { clearErrors, errors, register, unregister, handleSubmit } = useForm();
  const sessionContext = useContext(SessionContext);
  const checkerContext = useContext(CheckerContext);

  const { slug, sttrFile, text } = topic;
  const sessionAddress = sessionContext[slug]?.address || {};
  const hasSTTR = !!sttrFile;

  const [address, setAddress] = useState(sessionAddress);
  const [errorMessage, setErrorMessage] = useState();
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    if (!address && !errorMessage) {
      register({ name: "suffix" }, { required: "Kies een toevoeging." });
    } else {
      clearErrors("suffix");
    }
    return () => unregister("suffix");
  }, [address, clearErrors, errorMessage, register, unregister]);

  const onSubmit = () => {
    if (address.postalCode) {
      matomoTrackEvent({
        action: actions.CLICK_INTERNAL_NAVIGATION,
        name: `${eventNames.FORWARD} ${
          hasSTTR ? sections.QUESTIONS : sections.LOCATION_RESULT
        }`,
      });

      // Detect if user is submitting the same address as currently stored
      if (sessionAddress.id && sessionAddress.id === address.id) {
        // The address is the same, so go directly to the Questions section
        setActiveState(hasSTTR ? sections.QUESTIONS : sections.LOCATION_RESULT);
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
        answers = null;
      }

      checkerContext.autofillData.address = address;

      // Reset all previous finished states
      if (hasSTTR) {
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
        document.activeElement.blur();
      } else {
        setFinishedState(sections.LOCATION_INPUT);
        setActiveState(hasSTTR ? sections.QUESTIONS : sections.LOCATION_RESULT);
      }
    }
  };

  const onGoToPrev = () => {
    matomoTrackEvent({
      action: actions.CLICK_INTERNAL_NAVIGATION,
      name: `${eventNames.BACK} ${sections.INTRO}`,
    });

    // @TODO: We need to give a warning or we need to store the checker data as well
    sessionContext.setSessionData([
      slug,
      {
        address,
      },
    ]);
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
      {!hasSTTR && <Heading forwardedAs="h3">Invullen adres</Heading>}
      <Paragraph>{text.locationIntro}.</Paragraph>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <LocationFinder
          {...{
            errors,
            matomoTrackEvent,
            setAddress,
            setErrorMessage,
            setFocus,
            topic,
          }}
          address={sessionAddress}
        />
        <Nav
          noMarginBottom={!hasSTTR}
          onGoToPrev={onGoToPrev}
          showNext
          showPrev
        />
      </Form>
    </>
  );
};

export default withTracking(LocationInput);
