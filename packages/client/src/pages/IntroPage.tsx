import React, { FunctionComponent, Suspense } from "react";
import { Button } from "@amsterdam/asc-ui";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { Loading } from "../atoms";
import { TopicLayout } from "../components/Layouts";
import Markdown from "../components/Markdown";
import { sections } from "../config/matomo";
import { useTopic } from "../hooks";
import { geturl, routes } from "../routes";
import { GraphQLTopic } from "../types";
import { NEXT_BUTTON } from "../utils/test-ids";

// This page will only render in case of a topic `hasIMTR`
const IntroPage: FunctionComponent = () => {
  const history = useHistory();
  const topic = useTopic();
  const { t } = useTranslation();

  if (!topic) {
    return <Loading />;
  }

  const { text: {intro, heading} } = topic as GraphQLTopic;

  const goToNext = () => {
    history.push(geturl(routes.checker, topic));
  };

  return (
    <TopicLayout>
      <Helmet>
        <title>
          {t("common.introduction")} - {heading}
        </title>
      </Helmet>
      <Suspense fallback={<Loading />}>
        <Markdown eventLocation={sections.INTRO} source={intro} />
      </Suspense>
      <Button data-testid={NEXT_BUTTON} onClick={goToNext} variant="secondary">
        {t("common.do the permit check")}
      </Button>
    </TopicLayout>
  );
};

export default IntroPage;
