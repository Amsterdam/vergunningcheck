import { Paragraph } from "@amsterdam/asc-ui";
import React from "react";
import { useTranslation } from "react-i18next";

export default () => {
  const { t } = useTranslation();

  return (
    <>
      <Paragraph>
        {t(
          "introPage.firesafety.the building must be safe and the city must be able to verify"
        )}
      </Paragraph>
      <Paragraph>
        {t(
          "introPage.firesafety.you might need to report and in some case you need a permit"
        )}
      </Paragraph>
    </>
  );
};
