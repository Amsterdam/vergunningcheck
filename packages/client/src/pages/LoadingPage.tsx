import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

import { Loading } from "../atoms";
import { BaseLayout } from "../components/Layouts";

// This page will only render in case another page is loading (see Router.tsx)
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
