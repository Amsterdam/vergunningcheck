import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

import { Error } from "../atoms";
import { BaseLayout } from "../components/Layouts";

type ErrorProps = {
  message?: string;
  stack?: string;
};

type ErrorPageProps = {
  error?: ErrorProps;
};

const ErrorPage: FunctionComponent<ErrorPageProps> = ({ error }) => {
  const { t } = useTranslation();
  return (
    <BaseLayout>
      <Helmet>
        <title>
          {t("errorMessages.error occured")} - Amsterdam Vergunningcheck
        </title>
      </Helmet>
      <Error stack={error?.stack} content={error?.message} />
    </BaseLayout>
  );
};

export default ErrorPage;
