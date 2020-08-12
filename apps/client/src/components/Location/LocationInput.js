import { Heading, Paragraph } from "@datapunt/asc-ui";
import { useMatomo } from "@datapunt/matomo-tracker-react";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { CheckerContext, SessionContext } from "../../context";
import { geturl, routes } from "../../routes";
import Error from "../Error";
import Form from "../Form";
import Nav from "../Nav";
import LocationFinder from "./LocationFinder";

const LocationInput = ({
  isFinished,
  resetChecker,
  setActiveState,
  setFinishedState,
  topic,
}) => {
  const history = useHistory();
  const { trackEvent } = useMatomo();
  const { clearErrors, errors, register, unregister, handleSubmit } = useForm();
  const sessionContext = useContext(SessionContext);
  const checkerContext = useContext(CheckerContext);

  const { slug, text, sttrFile } = topic;
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
      // Detect if user is submitting the same address as currenly stored
      if (sessionAddress.id && sessionAddress.id === address.id) {
        if (isFinished("questions")) {
          setActiveState("conclusion");
        } else {
          setActiveState("questions");
        }
        return;
      }

      // Reset all previous finished states
      setFinishedState(["locationResult", "questions", "conclusion"], false);

      trackEvent({
        category: "postcode-input",
        action: `postcode - ${slug.replace("-", " ")}`,
        name: address.postalCode.substring(0, 4),
      });

      // Load given answers from sessionContext
      let answers = sessionContext[slug]?.answers;

      // Reset the checker and answers when the address is changed
      if (answers && sessionAddress.id !== address.id) {
        answers = null;
      }

      checkerContext.autofillData.address = address;

      if (hasSTTR) {
        resetChecker();
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
        setActiveState("locationResult");
      }
    }
  };

  return (
    <>
      {errorMessage && (
        <Error
          heading="Helaas. Wij kunnen nu geen locatiegegevens opvragen waardoor u deze check op dit moment niet kunt doen."
          stack={errorMessage?.stack}
        >
          <Paragraph>
            Probeer het later opnieuw. Of neem contact op met de gemeente op
            telefoonnummer <a href="tel:14020">14 020</a>.
          </Paragraph>
        </Error>
      )}
      {!hasSTTR && <Heading forwardedAs="h3">Invullen adres</Heading>}
      <Paragraph>{text.locationIntro}.</Paragraph>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <LocationFinder
          setAddress={setAddress}
          setFocus={setFocus}
          setErrorMessage={setErrorMessage}
          postalCode={sessionAddress.postalCode}
          houseNumberFull={sessionAddress.houseNumberFull}
          houseNumber={sessionAddress.houseNumberFull}
          errors={errors}
        />
        <Nav
          onGoToPrev={() => {
            // @TODO: We need to give a warning or we need to store the checker data as well
            sessionContext.setSessionData([
              slug,
              {
                address,
              },
            ]);
            history.push(geturl(routes.intro, topic));
          }}
          showNext
          showPrev
        />
      </Form>
    </>
  );
};

export default LocationInput;
