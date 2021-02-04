import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { Intro } from "./shared";

const DakraamIntro: FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <Intro
      usableForBullets={[
        t("introPage.common.monument bullet"),
        t("introPage.dakraam.placing bullet"),
      ]}
      usableForText={t("introPage.dakraam.intro description")}
      exceptions={[
        t("introPage.common.amount of houses exception"),
        t("introPage.dakraam.build without permit exception"),
      ]}
    />
  );
};

export default DakraamIntro;
