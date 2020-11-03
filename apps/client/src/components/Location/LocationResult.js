import { Heading, Paragraph } from "@datapunt/asc-ui";
import React from "react";

import { generateOloUrl } from "../../config";
import { actions, eventNames, sections } from "../../config/matomo";
import { useTopicSession } from "../../hooks";
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
  const { topicData, setTopicData } = useTopicSession();
  const address = topicData.address || {};
  const { questionIndex } = topicData || {};
  const hasSTTR = !!topic.sttrFile;

  const onSubmit = (e) => {
    e.preventDefault();
    if (hasSTTR) {
      if (typeof questionIndex !== "number") {
        // Init checker by setting question index to 0
        setTopicData({
          questionIndex: 0,
        });
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
      {!hasSTTR && <Heading forwardedAs="h3">Adresgegevens</Heading>}
      <RegisterLookupSummary
        displayZoningPlans={!hasSTTR}
        {...{
          address,
          matomoTrackEvent,
          setActiveState,
          topic,
        }}
      />
      {!hasSTTR && (
        <Paragraph gutterBottom={0}>
          {/* OLO Flow text */}U hebt deze informatie nodig om de
          vergunningcheck te doen op het Omgevingsloket.
        </Paragraph>
      )}

      {isActive(sections.LOCATION_RESULT) && (
        <Nav
          formEnds={!hasSTTR}
          nextText={hasSTTR ? "Naar de vragen" : "Naar het omgevingsloket"}
          noMarginBottom={!hasSTTR}
          onGoToPrev={onGoToPrev}
          showNext
          showPrev
        />
      )}
    </Form>
  );
};
export default LocationResult;
