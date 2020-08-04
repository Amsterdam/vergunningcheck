import { Paragraph } from "@datapunt/asc-ui";
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

const Location = ({ topic, setActiveState }) => {
  const { trackEvent } = useMatomo();
  const sessionContext = useContext(SessionContext);
  const checkerContext = useContext(CheckerContext);
  const history = useHistory();
  const { slug, text } = topic;
  const sessionAddress = sessionContext[slug]?.address || {};
  const [address, setAddress] = useState(sessionAddress);
  const [focus, setFocus] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const { clearErrors, errors, register, unregister, handleSubmit } = useForm();

  useEffect(() => {
    if (!address && !errorMessage) {
      register({ name: "suffix" }, { required: "Kies een toevoeging." });
    } else {
      clearErrors("suffix");
    }
    return () => unregister("suffix");
  }, [address, clearErrors, errorMessage, register, unregister]);

  const onSubmit = () => {
    if (address) {
      trackEvent({
        category: "postcode-input",
        action: `postcode - ${slug.replace("-", " ")}`,
        name: address.postalCode.substring(0, 4),
      });

      // Load given answers from sessionContext
      let answers = sessionContext[slug]?.answers;

      // Reset the checker and answers when the address is changed
      if (answers && sessionAddress.id !== address.id) {
        checkerContext.checker = null;
        answers = null;
      }

      checkerContext.autofillData.address = address;

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
        setActiveState("address");
        if (checkerContext.checker) {
          checkerContext.checker.next();
        }
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

export default Location;
