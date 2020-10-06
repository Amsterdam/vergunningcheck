import { Heading, Paragraph } from "@amsterdam/asc-ui";
import React, { useContext } from "react";

import { generateOloUrl } from "../../config";
import { actions, eventNames, sections } from "../../config/matomo";
import { SessionContext } from "../../context";
import { LOCATION_RESULT } from "../../utils/test-ids";
import Form from "../Form";
import Nav from "../Nav";
import RegisterLookupSummary from "../RegisterLookupSummary";

const LocationResult = ({
  isActive,
  isFinished,
  matomoTrackEvent,
  setFinishedState,
  setActiveState,
  topic,
}) => {
  const sessionContext = useContext(SessionContext);
  const address = sessionContext[topic.slug].address || {};
  const { questionIndex } = sessionContext[topic.slug] || {};
  const { hasIMTR } = topic;

  const onSubmit = (e) => {
    e.preventDefault();
    if (hasIMTR) {
      if (typeof questionIndex !== "number") {
        // Init checker by setting question index to 0
        sessionContext.setSessionData([
          topic.slug,
          {
            questionIndex: 0,
          },
        ]);
      }

      setFinishedState(sections.LOCATION_RESULT, true);

      const eventSection = isFinished(sections.QUESTIONS)
        ? sections.CONCLUSION
        : sections.QUESTIONS;

      matomoTrackEvent({
        action: actions.CLICK_INTERNAL_NAVIGATION,
        name: `${eventNames.FORWARD} ${eventSection}`,
      });

      if (isFinished(sections.QUESTIONS)) {
        setActiveState(sections.CONCLUSION);
      } else {
        setActiveState(sections.QUESTIONS);
      }
    } else {
      matomoTrackEvent({
        action: actions.CLICK_EXTERNAL_NAVIGATION,
        name: eventNames.TO_OLO,
      });
      window.open(generateOloUrl(address), "_blank");
    }
  };

  const onGoToPrev = () => {
    matomoTrackEvent({
      action: actions.CLICK_INTERNAL_NAVIGATION,
      name: `${eventNames.BACK} ${sections.LOCATION_INPUT}`,
    });
    setActiveState(sections.LOCATION_INPUT);
  };

  return (
    <Form onSubmit={onSubmit} data-testid={LOCATION_RESULT}>
      {!hasIMTR && <Heading forwardedAs="h3">Adresgegevens</Heading>}
      <RegisterLookupSummary
        displayZoningPlans={!hasIMTR}
        {...{
          address,
          matomoTrackEvent,
          setActiveState,
          topic,
        }}
      />
      {!hasIMTR && (
        <Paragraph gutterBottom={0}>
          {/* OLO Flow text */}U hebt deze informatie nodig om de
          vergunningcheck te doen op het Omgevingsloket.
        </Paragraph>
      )}

      {isActive(sections.LOCATION_RESULT) && (
        <Nav
          formEnds={!hasIMTR}
          nextText={hasIMTR ? "Naar de vragen" : "Naar het omgevingsloket"}
          noMarginBottom={!hasIMTR}
          onGoToPrev={onGoToPrev}
          showNext
          showPrev
        />
      )}
    </Form>
  );
};
export default LocationResult;
