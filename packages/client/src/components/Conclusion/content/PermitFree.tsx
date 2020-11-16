import { Heading, ListItem } from "@amsterdam/asc-ui";
import React from "react";
import { useTranslation } from "react-i18next";

import { List } from "../../../atoms/index";
import { PERMIT_FREE } from "../../../utils/test-ids";

const PermitFree: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Heading forwardedAs="h3" data-testid={PERMIT_FREE}>
        {t("outcome.payAttentionTo.pay attention heading")}
      </Heading>
      <List variant="bullet">
        <ListItem>
          {t("outcome.payAttentionTo.apply to building code")}
        </ListItem>
        <ListItem>{t("outcome.payAttentionTo.take in account")}</ListItem>
      </List>
      <Heading forwardedAs={"h3"}>
        {"outcome.thinkAbout.also think about"}
      </Heading>
      <List variant={"bullet"}>
        <ListItem>{t("outcome.thinkAbout.placement of a crane")}</ListItem>
        <ListItem>{t("outcome.thinkAbout.disposal of waste")}</ListItem>
        <ListItem>{t("outcome.thinkAbout.the risk of asbestos")}</ListItem>
        <ListItem>{t("outcome.thinkAbout.view on neighbors grounds")}</ListItem>
        <ListItem>
          {t("outcome.thinkAbout.the consequences for the WOZ")}
        </ListItem>
        <ListItem>{t("outcome.thinkAbout.permission from the VvE")}</ListItem>
      </List>
    </>
  );
};

export default PermitFree;
