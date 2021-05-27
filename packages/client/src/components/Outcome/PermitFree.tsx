import { Heading, ListItem } from "@amsterdam/asc-ui";
import React from "react";
import { useTranslation } from "react-i18next";

import { List } from "../../atoms";
import { PERMIT_FREE } from "../../utils/test-ids";

type Props = {
  payAttentionToOverwrite?: string[];
  alsoThinkAboutOverwrite?: string[];
};

export default ({
  payAttentionToOverwrite,
  alsoThinkAboutOverwrite,
}: Props) => {
  const { t } = useTranslation();
  const payAttentionToDefault = [
    t("outcome.payAttentionTo.apply to building code"),
    t("outcome.payAttentionTo.take in account"),
  ];
  const alsoThinkAboutDefault = [
    t("outcome.thinkAbout.placement of a crane"),
    t("outcome.thinkAbout.disposal of waste"),
    t("outcome.thinkAbout.the risk of asbestos"),
    t("outcome.thinkAbout.view on neighbors grounds"),
    t("outcome.thinkAbout.the consequences for the WOZ"),
    t("outcome.thinkAbout.permission from the VvE"),
  ];

  const payAttentionTo = payAttentionToOverwrite
    ? payAttentionToOverwrite
    : payAttentionToDefault;

  const alsoThinkAbout = alsoThinkAboutOverwrite
    ? alsoThinkAboutOverwrite
    : alsoThinkAboutDefault;

  return (
    <>
      {payAttentionTo.length > 0 && (
        <>
          <Heading forwardedAs="h3" data-testid={PERMIT_FREE}>
            {t("outcome.payAttentionTo.pay attention heading")}
          </Heading>
          <List variant="bullet">
            {payAttentionTo.map((item) => (
              <ListItem key={item}>{item}</ListItem>
            ))}
          </List>
        </>
      )}
      {alsoThinkAbout.length > 0 && (
        <>
          <Heading forwardedAs={"h3"}>
            {payAttentionTo.length === 0
              ? t("outcome.thinkAbout.think about")
              : t("outcome.thinkAbout.also think about")}
          </Heading>
          <List variant={"bullet"}>
            {alsoThinkAbout.map((item) => (
              <ListItem key={item}>{item}</ListItem>
            ))}
          </List>
        </>
      )}
    </>
  );
};
