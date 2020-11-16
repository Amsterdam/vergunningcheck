import React from "react";
import { useTranslation } from "react-i18next";

import { Intro } from "./shared";

export default () => {
  const { t } = useTranslation();
  return (
    <Intro
      introSentence={t("introPage.slopen.need report")}
      showContactInformation={false}
      usableForText={t("introPage.slopen.intro description")}
    />
  );
};
