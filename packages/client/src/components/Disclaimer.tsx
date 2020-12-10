import { CompactThemeProvider, Paragraph } from "@amsterdam/asc-ui";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { DISCLAIMER_TEXT } from "../utils/test-ids";

const Disclaimer: FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <CompactThemeProvider>
      <Paragraph
        data-testid={DISCLAIMER_TEXT}
        forwardedAs="em"
        gutterBottom={0}
      >
        {t("outcome.disclaimer")}
      </Paragraph>
    </CompactThemeProvider>
  );
};

export default Disclaimer;
