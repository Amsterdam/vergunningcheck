import { Paragraph } from "@amsterdam/asc-ui";
import React from "react";
import { useTranslation } from "react-i18next";

export default () => {
  const { t } = useTranslation();

  return (
    <>
      <Paragraph>
        {t("introPage.kappen-of-snoeien.you may need a permit")}
      </Paragraph>
    </>
  );
};
