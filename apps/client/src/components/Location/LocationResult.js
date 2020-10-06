import { Heading, Paragraph } from "@datapunt/asc-ui";
import React, { useContext } from "react";

import { generateOloUrl } from "../../config";
import { actions, eventNames, sections } from "../../config/matomo";
import { SessionContext } from "../../context";
import { LOCATION_RESULT } from "../../utils/test-ids";
import Form from "../Form";
import Nav from "../Nav";
import RegisterLookupSummary from "../RegisterLookupSummary";

const LocationResult = ({
  matomoTrackEvent,
  resetChecker,
  setActiveState,
  topic,
}) => {
  const sessionContext = useContext(SessionContext);
  const address = sessionContext[topic.slug].address || {};
  const { hasIMTR } = topic;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!hasIMTR) {
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
      <Heading forwardedAs="h3">Adresgegevens</Heading>
      <RegisterLookupSummary
        {...{
          matomoTrackEvent,
          resetChecker,
          setActiveState,
          topic,
        }}
      />
      <Paragraph gutterBottom={0}>
        {/* OLO Flow text */}U hebt deze informatie nodig om de vergunningcheck
        te doen op het Omgevingsloket.
      </Paragraph>
      <Nav
        formEnds={!hasIMTR}
        nextText={"Naar het omgevingsloket"}
        noMarginBottom={!hasIMTR}
        onGoToPrev={onGoToPrev}
        showNext
        showPrev
      />
    </Form>
  );
};

export default LocationResult;
