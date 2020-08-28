import { Heading, Paragraph } from "@datapunt/asc-ui";
import React from "react";

import { List, ListItem } from "../../atoms";
import ContactSentence from "../../components/ContactSentence";
import { eventNames } from "../../config/matomo";
import {
  INTRO_EXCEPTION_BULLETS,
  INTRO_USABLE_FOR_BULLETS,
  INTRO_USABLE_FOR_TEXT,
  INTRO_USER_INFLUENCE,
} from "../../utils/test-ids";

type Props = {
  exceptions?: string[];
  dependantOnQuestions?: boolean;
  dependantOnSituation?: boolean;
  showContactInformation?: boolean;
  usableForBullets?: string[];
  usableForText?: string;
};

export default ({
  dependantOnQuestions = true,
  dependantOnSituation = true,
  exceptions = [],
  showContactInformation = true,
  usableForBullets = [],
  usableForText,
}: Props) => {
  const influence =
    dependantOnSituation && dependantOnQuestions
      ? "Uw situatie en uw antwoorden bepalen of u een omgevingsvergunning nodig hebt."
      : dependantOnSituation
      ? "Uw situatie bepaalt of u een omgevingsvergunning nodig hebt."
      : dependantOnQuestions
      ? "Uw antwoorden bepalen of u een omgevingsvergunning nodig hebt."
      : null;

  return (
    <>
      <Paragraph>
        Met de vergunningcheck kunt u zien wanneer u een omgevingsvergunning
        nodig hebt.
        {usableForBullets.length > 0 &&
          " U kunt een vergunning nodig hebben voor:"}
      </Paragraph>

      {usableForBullets.length > 0 && (
        <List variant="bullet" data-testid={INTRO_USABLE_FOR_BULLETS}>
          {usableForBullets.map((bulletText) => (
            <ListItem key={bulletText}>{bulletText}</ListItem>
          ))}
        </List>
      )}

      {influence && (
        <Paragraph data-testid={INTRO_USER_INFLUENCE}>
          {influence}{" "}
          {dependantOnQuestions &&
            "U kunt een antwoord wijzigen. Zo kunt u zien op welke manier u misschien toch geen vergunning nodig hebt."}
        </Paragraph>
      )}

      {usableForText && (
        <Paragraph data-testid={INTRO_USABLE_FOR_TEXT}>
          {usableForText}
        </Paragraph>
      )}

      {exceptions.length > 0 && (
        <>
          <Heading forwardedAs="h4">Uitzonderingen:</Heading>
          <Paragraph gutterBottom={8}>
            In de volgende situaties is het niet mogelijk de vergunningcheck te
            gebruiken:
          </Paragraph>
          <List
            variant="bullet"
            style={{ marginBottom: 12 }}
            data-testid={INTRO_EXCEPTION_BULLETS}
          >
            {exceptions.map((exception) => (
              <ListItem key={exception}>{exception}</ListItem>
            ))}
          </List>
          {showContactInformation && (
            <Paragraph>
              <ContactSentence eventName={eventNames.INTRO_EXTRAORDINARY} />
            </Paragraph>
          )}
        </>
      )}

      {exceptions.length === 0 && showContactInformation && (
        <Paragraph>
          <ContactSentence
            openingSentence="Heeft u vragen? Bel dan"
            eventName={eventNames.INTRO}
          />
        </Paragraph>
      )}
    </>
  );
};
