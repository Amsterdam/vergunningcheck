import { Paragraph } from "@datapunt/asc-ui";
import React, { useContext } from "react";

import { OLO } from "../../config";
import { SessionContext } from "../../context";
import { ADDRESS_PAGE } from "../../utils/test-ids";
import Form from "../Form";
import Nav from "../Nav";
import RegisterLookupSummary from "../RegisterLookupSummary";

const LocationResult = ({
  topic,
  setFinishedState,
  setActiveState,
  isFinished,
}) => {
  const sessionContext = useContext(SessionContext);
  const address = sessionContext[topic.slug].address || {};
  const useSTTR = !!topic.sttrFile;

  const getOloUrl = ({ postalCode, houseNumberFull, houseNumber }) => {
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

  const onSubmit = (e) => {
    e.preventDefault();
    if (useSTTR) {
      setFinishedState("locationResult", true);
      setActiveState("questions");
    } else {
      window.open(getOloUrl(address), "_blank");
    }
  };

  return (
    <Form onSubmit={onSubmit} data-testid={ADDRESS_PAGE}>
      <RegisterLookupSummary
        displayZoningPlans={!useSTTR}
        address={address}
        setActiveState={setActiveState}
        setFinishedState={setFinishedState}
        topic={topic}
      />
      <Paragraph>
        {useSTTR
          ? `We gebruiken deze informatie bij het invullen van de vergunningcheck. `
          : `U hebt deze informatie nodig om de vergunningcheck te doen op het Omgevingsloket. `}
      </Paragraph>

      {topic.text?.addressPage && (
        <Paragraph>{topic.text.addressPage}</Paragraph>
      )}

      {!isFinished("locationResult") && (
        <Nav
          onGoToPrev={() => {
            setActiveState("locationInput");
          }}
          nextText={!useSTTR ? "Naar het omgevingsloket" : "Naar de Vragen"}
          formEnds={!useSTTR}
          showPrev
          showNext
        />
      )}
    </Form>
  );
};
export default LocationResult;
