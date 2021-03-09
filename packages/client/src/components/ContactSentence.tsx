import React from "react";
import { useTranslation } from "react-i18next";

import PhoneNumber from "./PhoneNumber";

type Props = {
  eventName: string;
  link?: boolean;
  openingSentence?: string;
};

export default ({
  eventName,
  link = true,
  openingSentence = "call in this situations", // This is the text before the phonenumber `14 020`
}: Props) => {
  const { t } = useTranslation();
  return (
    <em>
      {t(`introPage.common.${openingSentence}`)}{" "}
      <PhoneNumber {...{ eventName, link }} />{" "}
      {t("introPage.common.monday till friday")}
    </em>
  );
};
