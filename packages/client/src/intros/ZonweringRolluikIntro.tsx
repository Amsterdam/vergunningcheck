import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { Intro } from "./shared";

const ZonweringRolluikIntro: FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <Intro
      usableForBullets={[
        t("introPage.common.monument bullet"),
        t("introPage.zonwering.placing bullet"),
      ]}
      usableForText={t("introPage.zonwering.intro description")}
      exceptions={[
        t("introPage.common.amount of houses exception"),
        t("introPage.zonwering.build without permit exception"),
      ]}
    />
  );
};

export default ZonweringRolluikIntro;
