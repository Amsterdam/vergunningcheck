import { Heading, Paragraph } from "@amsterdam/asc-ui";
import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

import { BaseLayout } from "../components/Layouts";

// This page will only render when a route does not exist (404)
const NotFoundPage: FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <BaseLayout>
      <Helmet>
        <title>
          {t("errorMessages.page not found")} - {t("common.page title")}
        </title>
      </Helmet>
      <Heading forwardedAs="h2">{t("notFoundPage.heading")}</Heading>
      <Paragraph>{t("notFoundPage.paragraph")}</Paragraph>
    </BaseLayout>
  );
};

export default NotFoundPage;
