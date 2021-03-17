import React from "react";
import { useTranslation } from "react-i18next";

import PhoneNumber from "./PhoneNumber";

type Props = {
  eventName: string;
  link?: boolean;
};

export default ({ eventName, link = true }: Props) => {
  const { t } = useTranslation();
  return (
    <>
      {t(`introPage.common.call in this situations`)}{" "}
      <PhoneNumber {...{ eventName, link }} />:
    </>
  );
};
