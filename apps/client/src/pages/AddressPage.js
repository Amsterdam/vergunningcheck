import { Paragraph } from "@datapunt/asc-ui";
import PropTypes from "prop-types";
import React from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

import AddressLine from "../components/AddressLine";
import Form from "../components/Form";
import Layout from "../components/Layouts/DefaultLayout";
import Nav from "../components/Nav";
import RegisterLookupSummary from "../components/RegisterLookupSummary";
import { OLO } from "../config";
import withAutofillData from "../hoc/withAutofillData";
import { geturl, routes } from "../routes";
import { ADDRESS_PAGE } from "../utils/test-ids";

const getOloUrl = ({ postalCode, houseNumberFull, houseNumber }) => {
  // Form is validated, we can proceed

  // Generate OLO parameter "postalCode"
  const oloPostalCode = `facet_locatie_postcode=${postalCode}`;

  // Generate OLO parameter "streetNumber"
  const oloStreetNumber = `facet_locatie_huisnummer=${houseNumber}`;

  const oloSuffix = `facet_locatie_huisnummertoevoeging=${houseNumberFull
    .replace(houseNumber, "")
    .trim()}`;

  // Redirect user to OLO with all parameters
  return `${OLO.location}?param=postcodecheck&${oloPostalCode}&${oloStreetNumber}&${oloSuffix}`;
};

const AddressPage = ({ topic, autofillData }) => {
  const history = useHistory();
  const { slug } = topic;
  const { address } = autofillData;
  const useSTTR = !!topic.sttrFile;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (useSTTR) {
      history.push(geturl(routes.wrapper, { slug }));
    } else {
      window.open(getOloUrl(address), "_blank");
    }
  };
  return (
    <Layout>
      <Helmet>
        <title>Uw adresgegevens - {topic.text.heading}</title>
      </Helmet>
      <Form onSubmit={handleSubmit} data-testid={ADDRESS_PAGE}>
        <Paragraph>
          Over <AddressLine address={address} /> hebben we de volgende
          informatie gevonden:
        </Paragraph>

        <RegisterLookupSummary
          displayZoningPlans={!useSTTR}
          address={address}
        />

        <Paragraph>
          {useSTTR
            ? `We gebruiken deze informatie bij het invullen van de vergunningcheck. `
            : `U hebt deze informatie nodig om de vergunningcheck te doen op het Omgevingsloket. `}
        </Paragraph>
        {topic.text?.addressPage && (
          <Paragraph>{topic.text.addressPage}</Paragraph>
        )}

        <Nav
          onGoToPrev={() => history.push(geturl(routes.location, { slug }))}
          nextText={!useSTTR ? "Naar het omgevingsloket" : undefined}
          formEnds={!useSTTR}
          showPrev
          showNext
        />
      </Form>
    </Layout>
  );
};

AddressPage.propTypes = {
  addressResults: PropTypes.any,
  addressResultsLoading: PropTypes.bool,
  bagLoading: PropTypes.bool,
};

export default withAutofillData(AddressPage);
