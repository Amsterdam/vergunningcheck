import React, { FunctionComponent, Suspense } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import {Button} from "@amsterdam/asc-ui";
import {useTranslation} from "react-i18next";

import Loading from "../components/Loading";
import Markdown from "../components/Markdown";
import { TopicLayout } from "../components/Layouts";
import { sections } from "../config/matomo";
import { useTopic } from "../hooks";
import { geturl, routes } from "../routes";
import { Topic } from "../types";
import {NEXT_BUTTON} from "../utils/test-ids";

const IntroPage: FunctionComponent = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const topic = useTopic();

  if (!topic) {
    return <p>loading...</p>;
  }

  const { text, intro } = topic as Topic;

  const goToNext = () => {
    history.push(geturl(routes.checker, topic));
  };

  return (
    <TopicLayout>
      <Helmet>
        <title>Inleiding - {text.heading}</title>
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
