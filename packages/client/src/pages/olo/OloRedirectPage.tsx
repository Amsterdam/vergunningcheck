import { Heading, Paragraph } from "@amsterdam/asc-ui";
import React, { FunctionComponent, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

import { TopicLayout } from "../../components/Layouts";
import { urls } from "../../config";
import { useTopic } from "../../hooks";

const OloRedirectPage: FunctionComponent = () => {
  const { text } = useTopic();
  const { t } = useTranslation();

  useEffect(() => {
    const redirect = setTimeout(() => {
      window.open(urls.OLO_INTRO, "_self");
    }, 2000);

    return () => {
      clearTimeout(redirect);
    };
  });

  return (
    <TopicLayout>
      <Helmet>
        <title>
          {t("oloRedirectPage.page title")} - {text.heading}
        </title>
      </Helmet>
      <Heading forwardedAs="h2">{t("common.one moment please")}</Heading>
      <Paragraph>
        {t("oloRedirectPage.paragraph")}{" "}
        <a title={t("oloRedirectPage.link")} href={urls.OLO_INTRO}>
          {t("oloRedirectPage.link")}
        </a>
        .
      </Paragraph>
    </TopicLayout>
  );
};

export default OloRedirectPage;
