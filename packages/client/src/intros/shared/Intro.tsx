import { Heading, Paragraph } from "@amsterdam/asc-ui";
import React from "react";
import { useTranslation } from "react-i18next";

import { ComponentWrapper, List, ListItem } from "../../atoms";
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
  introSentence?: string;
  showContactInformation?: boolean;
  usableForBullets?: string[];
  usableForText?: string;
};

export default ({
  dependantOnQuestions = true,
  dependantOnSituation = true,
  exceptions = [],
  introSentence,
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
    <ComponentWrapper marginBottom={48}>
      {introSentence && <Paragraph>{introSentence}</Paragraph>}
      {usableForBullets?.length > 0 && (
        <>
          <Paragraph gutterBottom={8}>
            {t("introPage.common.check for permit intro")}{" "}
            {t("introPage.common.permit for")}
          </Paragraph>
          <List data-testid={INTRO_USABLE_FOR_BULLETS} variant="bullet">
            {usableForBullets?.map((bulletText) => (
              <ListItem key={bulletText}>{bulletText}</ListItem>
            ))}
          </List>
        </>
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
          <Heading styleAs="h4" forwardedAs="h3">
            <em>{t("introPage.common.exceptions title")}</em>
          </Heading>
          {showContactInformation && (
            <Paragraph>
              <ContactSentence eventName={sections.INTRO} />
            </Paragraph>
          )}
          <List
            data-testid={INTRO_EXCEPTION_BULLETS}
            style={{ marginBottom: 12 }}
            variant="bullet"
          >
            {exceptions.map((exception) => (
              <ListItem key={exception}>
                <em>{exception}</em>
              </ListItem>
            ))}
          </List>
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
    </ComponentWrapper>
  );
};
