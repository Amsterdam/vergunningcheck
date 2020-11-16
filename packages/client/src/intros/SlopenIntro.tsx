import React from "react";
import { useTranslation } from "react-i18next";

import { Intro } from "./shared";

export default () => {
  const { t } = useTranslation();
  return (
    <Intro
      needReport
      showContactInformation={false}
      usableForText={t("introPage.demolition.intro description")}
    />
  );
};
