import { Heading, Paragraph } from "@amsterdam/asc-ui";
import React from "react";
import { useTranslation } from "react-i18next";

import { List, ListItem } from "../../atoms";
import ContactSentence from "../../components/ContactSentence";
import { sections } from "../../config/matomo";
import {
  INTRO_EXCEPTION_BULLETS,
  INTRO_USABLE_FOR_BULLETS,
  INTRO_USABLE_FOR_TEXT,
  INTRO_USER_INFLUENCE,
} from "../../utils/test-ids";

type Props = {
  dependantOnQuestions?: boolean;
  dependantOnSituation?: boolean;
  exceptions?: string[];
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
  const { t } = useTranslation();
  const influence =
    dependantOnSituation && dependantOnQuestions
      ? t(
          "introPage.common.situation dependent on both situation and questions"
        )
      : dependantOnQuestions
      ? t("introPage.common.situation dependent on questions only")
      : dependantOnSituation
      ? t("introPage.common.situation dependent on situation only")
      : null;

  return (
    <>
      <Paragraph gutterBottom={usableForBullets.length > 0 ? 8 : undefined}>
        {t("introPage.common.check for permit intro")}{" "}
        {usableForBullets.length > 0 && t("introPage.common.permit for")}
      </Paragraph>

      {usableForBullets.length > 0 && (
        <List data-testid={INTRO_USABLE_FOR_BULLETS} variant="bullet">
          {usableForBullets.map((bulletText) => (
            <ListItem key={bulletText}>{bulletText}</ListItem>
          ))}
        </List>
      )}

      {influence && (
        <Paragraph data-testid={INTRO_USER_INFLUENCE}>
          {influence}{" "}
          {dependantOnQuestions && t("introPage.common.change answer")}
        </Paragraph>
      )}

      {usableForText && (
        <Paragraph data-testid={INTRO_USABLE_FOR_TEXT}>
          {usableForText}
        </Paragraph>
      )}

      {exceptions.length > 0 && (
        <>
          <Heading forwardedAs="h4">
            {t("introPage.common.exceptions title")}
          </Heading>
          <Paragraph gutterBottom={8}>
            {t("introPage.common.exceptions description")}
          </Paragraph>
          <List
            data-testid={INTRO_EXCEPTION_BULLETS}
            style={{ marginBottom: 12 }}
            variant="bullet"
          >
            {exceptions.map((exception) => (
              <ListItem key={exception}>{exception}</ListItem>
            ))}
          </List>
          {showContactInformation && (
            <Paragraph>
              <ContactSentence eventName={sections.INTRO} />
            </Paragraph>
          )}
        </>
      )}

      {exceptions.length === 0 && showContactInformation && (
        <Paragraph>
          <ContactSentence
            eventName={sections.INTRO}
            openingSentence={t("introPage.common.call with questions")}
          />
        </Paragraph>
      )}
    </>
  );
};
