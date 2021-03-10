import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import PhoneNumber from "./PhoneNumber";

type Props = {
  eventName: string;
  link?: boolean;
  openingSentence?: string;
};

const StyledPhoneNumber = styled(PhoneNumber)`
  font-size: 14px;
`;

export default ({
  eventName,
  link = true,
  openingSentence = "call in this situations", // This is the text before the phonenumber `14 020`
}: Props) => {
  const { t } = useTranslation();
  return (
    <>
      {t(`introPage.common.${openingSentence}`)}{" "}
      <StyledPhoneNumber {...{ eventName, link }} />
      {t("introPage.common.monday till friday")}
    </>
  );
};
