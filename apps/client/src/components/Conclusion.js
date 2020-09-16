import { Button, Heading, Modal, Paragraph } from "@datapunt/asc-ui";
import React, { Fragment, useState } from "react";
import { isIE, isMobile } from "react-device-detect";

import {
  Alert,
  ComponentWrapper,
  HideForPrint,
  PrintButton,
  PrintOnly,
} from "../atoms";
import { Olo } from "../config";
import { actions, eventNames, sections } from "../config/matomo";
import withTracking from "../hoc/withTracking";
import { sttrOutcomes } from "../sttr_client/models/checker";
import ContactSentence from "./ContactSentence";
import Markdown from "./Markdown";

const Conclusion = ({ checker, matomoTrackEvent, resetChecker }) => {
  const [modalShown, toggleModal] = useState(false);

  // find conclusions we want to display to the user
  const conclusions = checker?.permits
    .filter((permit) => !!permit.getOutputByDecisionId("dummy"))
    .map((permit) => {
      const conclusion = permit.getDecisionById("dummy");
      const conclusionMatchingRules = conclusion.getMatchingRules();
      const contactOutcome = conclusionMatchingRules.find(
        (rule) => rule.outputValue === sttrOutcomes.NEED_CONTACT
      );
      const outcome =
        contactOutcome?.outputValue || conclusionMatchingRules[0].outputValue;

      return {
        outcome,
        title:
          outcome === sttrOutcomes.NEED_CONTACT
            ? "Neem contact op met de gemeente"
            : `${permit.name.replace("Conclusie", "")}: ${outcome.replace(
                /['"]+/g,
                ""
              )}`,
        description:
          outcome === sttrOutcomes.NEED_CONTACT
            ? contactOutcome.description
            : conclusionMatchingRules[0].description,
      };
    });

  const contactConclusion = conclusions.find(
    ({ outcome }) => outcome === sttrOutcomes.NEED_CONTACT
  );

  const needsPermit = !!conclusions.find(
    ({ outcome }) => outcome === sttrOutcomes.NEED_PERMIT
  );

  const displayConclusions = contactConclusion
    ? [contactConclusion]
    : conclusions;

  const handleAnotherCheck = () => {
    matomoTrackEvent({
      action: actions.CLICK_INTERNAL_NAVIGATION,
      name: eventNames.START_NEW_CHECK,
    });

    toggleModal(!modalShown);
  };

  const handlePermitButton = (e) => {
    e.preventDefault();
    matomoTrackEvent({
      action: actions.CLICK_EXTERNAL_NAVIGATION,
      name: eventNames.APPLY_FOR_PERMIT,
    });
    // Open OLO in new tab/window
    window.open(Olo.home, "_blank");
  };

  const handlePrintButton = () => {
    matomoTrackEvent({
      action: actions.DOWNLOAD,
      name: eventNames.SAVE_CONCLUSION,
    });
    window.print();
  };

  return (
    <>
      {modalShown && <Modal></Modal>}
      <Paragraph>
        Op basis van uw antwoorden vindt u hieronder wat voor uw activiteit van
        toepassing is.
      </Paragraph>

      {displayConclusions.map(({ title, description }) => (
        <Fragment key={title}>
          <Heading forwardedAs="h2">{title}</Heading>
          <Markdown eventLocation={sections.CONCLUSION} source={description} />
        </Fragment>
      ))}

      <HideForPrint>
        {needsPermit && !contactConclusion && (
          <ComponentWrapper marginBottom={40}>
            <Button
              type="button"
              color="secondary"
              onClick={handlePermitButton}
            >
              Vergunning aanvragen
            </Button>
          </ComponentWrapper>
        )}

        {!isIE && !isMobile && (
          <ComponentWrapper>
            <PrintButton
              color="primary"
              onClick={handlePrintButton}
              type="button"
            >
              Conclusie opslaan
            </PrintButton>
          </ComponentWrapper>
        )}

        <Button type="button" color="primary" onClick={handleAnotherCheck}>
          Nog een vergunningcheck doen
        </Button>
      </HideForPrint>

      <PrintOnly withBorder avoidPageBreak>
        <Alert
          heading="Let op"
          content={
            <>
              De vergunningcheck is nog in ontwikkeling. Hierdoor kunnen wij nog
              geen zekerheid bieden dat de uitkomst correct is. Ook is de
              informatie nog niet voor iedereen goed te lezen of te beluisteren.
              Wilt u iets zeker weten of wilt u meer informatie?{" "}
              <ContactSentence
                openingSentence={"Bel dan de gemeente op"}
                link={false}
              />
            </>
          }
        />
      </PrintOnly>
    </>
  );
};

export default withTracking(Conclusion);
