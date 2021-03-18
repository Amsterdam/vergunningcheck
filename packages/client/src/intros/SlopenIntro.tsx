import { Paragraph } from "@amsterdam/asc-ui";
import React from "react";
import { useTranslation } from "react-i18next";

export default () => {
  const { t } = useTranslation();

  return (
    <>
      <Paragraph>
        {t("introPage.slopen.you want to demolish a structure")}
      </Paragraph>
      <Paragraph>
        {t("introPage.slopen.you may need a permit or to report")}
      </Paragraph>
      <Paragraph>
        {t(
          "introPage.common.sometimes it's written in a destination plan that a permit is required"
        )}
      </Paragraph>
    </>
  );
};
