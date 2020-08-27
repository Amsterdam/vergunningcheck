import { Heading, Paragraph } from "@datapunt/asc-ui";
import React, { useContext } from "react";

import { generateOloUrl } from "../../config";
import { SessionContext } from "../../context";
import { LOCATION_RESULT } from "../../utils/test-ids";
import Form from "../Form";
import Nav from "../Nav";
import RegisterLookupSummary from "../RegisterLookupSummary";

const LocationResult = ({
  isActive,
  isFinished,
  setFinishedState,
  setActiveState,
  topic,
}) => {
  const sessionContext = useContext(SessionContext);
  const address = sessionContext[topic.slug].address || {};
  const { questionIndex } = sessionContext[topic.slug] || {};
  const hasSTTR = !!topic.sttrFile;

  const onSubmit = (e) => {
    e.preventDefault();
    if (hasSTTR) {
      if (typeof questionIndex !== "number") {
        // Init checker by setting question index to 0
        sessionContext.setSessionData([
          topic.slug,
          {
            questionIndex: 0,
          },
        ]);
      }

      setFinishedState("locationResult", true);
      if (isFinished("questions")) {
        setActiveState("conclusion");
      } else {
        setActiveState("questions");
      }
    } else {
      window.open(generateOloUrl(address), "_blank");
    }
  };

  return (
    <Form onSubmit={onSubmit} data-testid={LOCATION_RESULT}>
      {!hasSTTR && <Heading forwardedAs="h3">Adresgegevens</Heading>}
      <RegisterLookupSummary
        address={address}
        displayZoningPlans={!hasSTTR}
        setActiveState={setActiveState}
        topic={topic}
      />
      {!hasSTTR && (
        <Paragraph gutterBottom={0}>
          {/* OLO Flow text */}U hebt deze informatie nodig om de
          vergunningcheck te doen op het Omgevingsloket.
        </Paragraph>
      )}

      {isActive("locationResult") && (
        <Nav
          formEnds={!hasSTTR}
          nextText={hasSTTR ? "Naar de vragen" : "Naar het omgevingsloket"}
          noMarginBottom={!hasSTTR}
          onGoToPrev={() => {
            setActiveState("locationInput");
          }}
          showNext
          showPrev
        />
      )}
    </Form>
  );
};
export default LocationResult;
