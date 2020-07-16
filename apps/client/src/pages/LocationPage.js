import { Heading, Paragraph } from "@datapunt/asc-ui";
import { useMatomo } from "@datapunt/matomo-tracker-react";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import Error from "../components/Error";
import Form from "../components/Form";
import Layout from "../components/Layouts/DefaultLayout";
import LocationFinder from "../components/Location/LocationFinder";
import Nav from "../components/Nav";
import { CheckerContext, SessionContext } from "../context";
import withTopic from "../hoc/withTopic";
import { geturl, routes } from "../routes";

const LocationPage = ({ topic }) => {
  const { trackEvent } = useMatomo();
  const sessionContext = useContext(SessionContext);
  const checkerContext = useContext(CheckerContext);
  const history = useHistory();
  const [address, setAddress] = useState(null);
  const [focus, setFocus] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const { clearErrors, errors, register, unregister, handleSubmit } = useForm();
  const { slug, text } = topic;
  const sessionAddress = sessionContext[slug]?.address || {};

  useEffect(() => {
    if (!address && !errorMessage) {
      register({ name: "suffix" }, { required: "Kies een toevoeging." });
    } else {
      clearErrors("suffix");
    }
    return () => unregister("suffix");
  }, [address, clearErrors, errorMessage, register, unregister]);

  const onSubmit = (event) => {
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
        history.push(geturl(routes.address, topic));
      }
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Invullen adres - {text.heading}</title>
      </Helmet>
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
      <Heading forwardedAs="h4">Invullen adres</Heading>
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
            sessionContext.setSessionData([
              slug,
              {
                address,
              },
            ]);
            history.push(geturl(routes.intro, topic));
          }}
          showPrev
          showNext
        />
      </Form>
    </Layout>
  );
};

export default withTopic(LocationPage);
