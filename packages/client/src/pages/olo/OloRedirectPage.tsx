import { Heading, Paragraph } from "@amsterdam/asc-ui";
import React, { FunctionComponent, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Trans, useTranslation } from "react-i18next";

import { TopicLayout } from "../../components/Layouts";
import { urls } from "../../config";
import { useTopic } from "../../hooks";

const OloRedirectPage: FunctionComponent = () => {
  const topic = useTopic();
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
        <title>Redirect naar OLO - {topic.text.heading}</title>
      </Helmet>
      <Heading forwardedAs="h2">{t("common.one moment please")}</Heading>
      <Paragraph>
        <Trans i18nKey={"common.we will automatically redirect you to olo"}>
          Wij sturen u automatisch door naar de website van het
          <a title="landelijke Omgevingsloket" href={urls.OLO_INTRO}>
            landelijke Omgevingsloket
          </a>
          .
        </Trans>
      </Paragraph>
    </TopicLayout>
  );
};

export default OloRedirectPage;
