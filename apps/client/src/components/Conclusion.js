import {
  Button,
  Checkbox,
  Heading,
  Label,
  Paragraph,
  Radio,
  RadioGroup,
} from "@datapunt/asc-ui";
import React, { Fragment } from "react";
import { isIE, isMobile } from "react-device-detect";

import {
  Alert,
  ComponentWrapper,
  HideForPrint,
  PrintButton,
  PrintOnly,
} from "../atoms";
import { Olo } from "../config";
import { topics } from "../config";
import { actions, eventNames, sections } from "../config/matomo";
import withTracking from "../hoc/withTracking";
import { sttrOutcomes } from "../sttr_client/models/checker";
import ContactSentence from "./ContactSentence";
import Markdown from "./Markdown";
import Modal from "./Modal";

const Conclusion = ({
  checker,
  matomoTrackEvent,
  // resetChecker
}) => {
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

  const handleModalButton = () => {
    matomoTrackEvent({
      action: actions.CLICK_INTERNAL_NAVIGATION,
      name: eventNames.START_NEW_CHECK,
    });
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

        <Modal
          buttonText="Nog een vergunningcheck doen"
          heading="Kies een vergunningcheck"
          onClick={handleModalButton}
        >
          <ComponentWrapper>
            <Heading forwardedAs="h2">
              Wilt u dezelfde adresgegevens gebruiken? [tekst updaten]
            </Heading>
            <Label htmlFor="ja" label="ja">
              <Checkbox
                value="value"
                id="ja"
                // onChange={(e) => onChange(e)}
              />
            </Label>
          </ComponentWrapper>

          <ComponentWrapper>
            <Heading forwardedAs="h2">
              Welke check wilt u doen? [tekst updaten]
            </Heading>

            <ComponentWrapper>
              <RadioGroup name="checks">
                {topics
                  .filter((topic) => topic.sttrFile)
                  .map((topic) => (
                    <Label
                      htmlFor={topic.name}
                      label={topic.name}
                      key={topic.name}
                    >
                      <Radio
                        value={topic.slug}
                        id={topic.name}
                        // onChange={(e) => onChange(e)}
                      />
                    </Label>
                  ))}
              </RadioGroup>
            </ComponentWrapper>

            <Button variant="secondary">Gaaan [tekst updaten]</Button>
          </ComponentWrapper>
        </Modal>
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
