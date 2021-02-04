import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { Intro } from "./shared";

const ZonnepanelenIntro: FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <Intro
      // Not sure why we wouldn't want to show the contact information in this intro-page.
      // It's the only exception.
      showContactInformation={false}
      usableForBullets={[
        t("introPage.common.monument bullet"),
        t("introPage.zonnepanelen.placing bullet"),
      ]}
      usableForText={t("introPage.zonnepanelen.intro description")}
    />
  );
};

export default ZonnepanelenIntro;
