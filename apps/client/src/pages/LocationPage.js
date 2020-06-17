import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import withTopic from "../hoc/withTopic";
import { Paragraph, Heading } from "@datapunt/asc-ui";

import Context from "../context";
import { geturl, routes } from "../routes";
import { useMatomo } from "@datapunt/matomo-tracker-react";

import Layout from "../components/Layouts/DefaultLayout";
import Form from "../components/Form";
import Nav from "../components/Nav";
import LocationFinder from "../components/Location/LocationFinder";
import { Helmet } from "react-helmet";
import Error from "../components/Error";
import { isProduction } from "../config";

const LocationPage = ({ topic }) => {
  const { trackEvent } = useMatomo();
  const context = useContext(Context);
  const history = useHistory();
  const [address, setAddress] = useState(null);
  const [errorMessage, setErrorMessage] = useState();
  const { clearError, errors, register, unregister, handleSubmit } = useForm();
  const { slug, text } = topic;

  useEffect(() => {
    if (!address && !errorMessage) {
      register({ name: "suffix" }, { required: "Kies een toevoeging." });
    } else {
      clearError("suffix");
    }
    return () => unregister("suffix");
  }, [address, clearError, errorMessage, register, unregister]);

  const onSubmit = () => {
    if (address && context.trackEvents && isProduction) {
      trackEvent({
        category: "postcode-input",
        action: `postcode - ${slug.replace("-", " ")}`,
        name: address.postalCode.substring(0, 4),
      });
    }
    context.address = address;
    history.push(geturl(routes.address, { slug }));
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
          setErrorMessage={setErrorMessage}
          postalCode={context.address?.postalCode}
          houseNumberFull={context.address?.houseNumberFull}
          houseNumber={context.address?.houseNumberFull}
          errors={errors}
        />
        <Nav
          onGoToPrev={() => {
            context.address = address;
            history.push(geturl(routes.intro, { slug }));
          }}
          showPrev
          showNext
        />
      </Form>
    </Layout>
  );
};

export default withTopic(LocationPage);
