import { Paragraph } from "@amsterdam/asc-ui";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { LOADING_TEXT } from "../utils/test-ids";

type LoadingProps = {
  message?: string;
};

const Loading: FunctionComponent<LoadingProps> = ({ message }) => {
  const { t } = useTranslation();
  return (
    <Paragraph data-testid={LOADING_TEXT}>
      {message ?? t("common.loading")}
    </Paragraph>
  );
};

export default Loading;
