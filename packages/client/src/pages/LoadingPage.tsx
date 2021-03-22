import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

import { Loading } from "../atoms";
import { BaseLayout } from "../components/Layouts";

const LoadingPage: FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <BaseLayout disablePageView>
      <Helmet>
        <title>
          {t("common.loading")} - {t("common.page title")}
        </title>
      </Helmet>
      <Loading />
    </BaseLayout>
  );
};

export default LoadingPage;
