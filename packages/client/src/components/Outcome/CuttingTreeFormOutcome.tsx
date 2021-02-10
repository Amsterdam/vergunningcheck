import { ListItem, Paragraph } from "@amsterdam/asc-ui";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { List } from "../../atoms";

const CuttingTreeFormOutcome: FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <>
      <Paragraph>
        {t(
          "outcome.cuttingTreeForm.you are done with the form and you can download it"
        )}
      </Paragraph>
      <List variant="bullet">
        <ListItem>{t("outcome.cuttingTreeForm.pictures of the tree")}</ListItem>
        <ListItem>
          {t(
            "outcome.cuttingTreeForm.a plan with the situation and the tree ids"
          )}
        </ListItem>
        <ListItem>{t("outcome.cuttingTreeForm.a written report")}</ListItem>
      </List>
    </>
  );
};

export default CuttingTreeFormOutcome;
