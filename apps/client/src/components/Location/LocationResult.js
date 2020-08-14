import { Heading, Paragraph } from "@datapunt/asc-ui";
import React, { useContext } from "react";

import { Flow as flowTypes, generateOloUrl } from "../../config";
import { SessionContext } from "../../context";
import { LOCATION_RESULT } from "../../utils/test-ids";
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
  const isOLO = topic.flow === flowTypes.olo;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isOLO) {
      sessionContext.setSessionData([
        topic.slug,
        {
          questionIndex: 0,
        },
      ]);
      setFinishedState("locationResult", true);
      setActiveState("questions");
    } else {
      window.open(generateOloUrl(address), "_blank");
    }
  };

  return (
    <Form onSubmit={onSubmit} data-testid={LOCATION_RESULT}>
      {isOLO && <Heading forwardedAs="h3">Adresgegevens</Heading>}
      <RegisterLookupSummary
        displayZoningPlans={isOLO}
        address={address}
        setActiveState={setActiveState}
        topic={topic}
      />
      {isOLO && (
        <Paragraph gutterBottom={0}>
          {/* OLO Flow text */}U hebt deze informatie nodig om de
          vergunningcheck te doen op het Omgevingsloket.
        </Paragraph>
      )}

      {!isFinished("locationResult") && (
        <Nav
          onGoToPrev={() => {
            setActiveState("locationInput");
          }}
          nextText={isOLO ? "Naar het omgevingsloket" : "Naar de vragen"}
          formEnds={isOLO}
          showPrev
          showNext
        />
      )}
    </Form>
  );
};
export default LocationResult;
