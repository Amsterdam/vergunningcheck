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
        {t("outcome.permitFree.pay attention heading")}
      </Heading>
      <List variant="bullet">
        <ListItem>{t("outcome.permitFree.apply to building code")}</ListItem>
        <ListItem>{t("outcome.permitFree.take in account")}</ListItem>
      </List>
      <Heading forwardedAs={"h3"}>
        {"outcome.permitFree.also think about"}
      </Heading>
      <List variant={"bullet"}>
        <ListItem>{t("outcome.permitFree.placement of a crane")}</ListItem>
        <ListItem>{t("outcome.permitFree.disposal of waste")}</ListItem>
        <ListItem>{t("outcome.permitFree.the risk of asbestos")}</ListItem>
        <ListItem>{t("outcome.permitFree.view on neighbors grounds")}</ListItem>
        <ListItem>
          {t("outcome.permitFree.the consequences for the WOZ")}
        </ListItem>
        <ListItem>{t("outcome.permitFree.permission from the VvE")}</ListItem>
      </List>
    </>
  );
};

export default PermitFree;
