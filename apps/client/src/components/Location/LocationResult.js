import { Heading, Paragraph } from "@datapunt/asc-ui";
import React, { useContext } from "react";

import { generateOloUrl } from "../../config";
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
  const useSTTR = !!topic.sttrFile;

  const onSubmit = (e) => {
    e.preventDefault();
    if (useSTTR) {
      setFinishedState("locationResult", true);
      setActiveState("questions");
    } else {
      window.open(generateOloUrl(address), "_blank");
    }
  };

  return (
    <Form onSubmit={onSubmit} data-testid={LOCATION_RESULT}>
      {!useSTTR && <Heading forwardedAs="h3">Adresgegevens</Heading>}
      <RegisterLookupSummary
        displayZoningPlans={!useSTTR}
        address={address}
        setActiveState={setActiveState}
        setFinishedState={setFinishedState}
        topic={topic}
      />
      {!useSTTR && (
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
