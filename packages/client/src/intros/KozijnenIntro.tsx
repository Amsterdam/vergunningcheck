import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { Intro } from "./shared";

const KozijnenIntro: FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <Intro
      usableForBullets={[
        t("introPage.common.monument bullet"),
        t("introPage.kozijnen.placing bullet"),
      ]}
      usableForText={t("introPage.kozijnen.intro description")}
      exceptions={[
        t("introPage.common.amount of houses exception"),
        t("introPage.kozijnen.build without permit exception"),
      ]}
    />
  );
};

export default KozijnenIntro;
