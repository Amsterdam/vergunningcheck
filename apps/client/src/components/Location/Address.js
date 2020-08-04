import { Paragraph } from "@datapunt/asc-ui";
import React, { useContext } from "react";

import { OLO } from "../../config";
import { SessionContext } from "../../context";
import { ADDRESS_PAGE } from "../../utils/test-ids";
import Form from "../Form";
import Nav from "../Nav";
import RegisterLookupSummary from "../RegisterLookupSummary";

const Address = ({ topic, setFinishedState, setActiveState, isFinished }) => {
  const sessionContext = useContext(SessionContext);
  const address = sessionContext[topic.slug].address || {};
  const useSTTR = !!topic.sttrFile;

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

  const onSubmit = (e) => {
    e.preventDefault();
    if (useSTTR) {
      setFinishedState("address", true);
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
      <Paragraph gutterBottom={useSTTR && topic.text?.addressPage ? null : 0}>
        {useSTTR
          ? // STTR Flow text (text we need to discuss because it's not in new design)
            `We gebruiken deze informatie bij het invullen van de
              vergunningcheck.`
          : // OLO Flow text
            ` U hebt deze informatie nodig om de vergunningcheck te doen op
              het Omgevingsloket.`}
      </Paragraph>

      {/* Extra text about this activity (text that can be in both flows) */}
      {/* This is also text we need to discuss because it's not in new design */}
      {topic.text?.addressPage && (
        <Paragraph gutterBottom={0}>{topic.text.addressPage}</Paragraph>
      )}

      {!isFinished("address") && (
        <Nav
          onGoToPrev={() => {
            setActiveState("location", true);
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
export default Address;
