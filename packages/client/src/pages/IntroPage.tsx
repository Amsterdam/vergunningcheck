import { Button } from "@amsterdam/asc-ui";
import React, { FunctionComponent, Suspense, lazy } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { Loading } from "../atoms";
import { TopicLayout } from "../components/Layouts";
import { useTopic } from "../hooks";
import { geturl, routes } from "../routes";
import { NEXT_BUTTON } from "../utils/test-ids";

const IntroPage: FunctionComponent = () => {
  const history = useHistory();
  const topic = useTopic();
  const { t } = useTranslation();

  const { intro, text } = topic;
  const introComponentPath = intro || "shared/DynamicIMTRIntro";
  const Intro = lazy(
    () => import(`../intros/${introComponentPath}`)
  ) as FunctionComponent;

  const goToNext = () => {
    history.push(geturl(routes.checker, topic));
  };

  return (
    <TopicLayout>
      <Helmet>
        <title>Inleiding - {text.heading}</title>
      </Helmet>
      <Suspense fallback={<Loading />}>
        <Intro />
      </Suspense>
      <Button data-testid={NEXT_BUTTON} onClick={goToNext} variant="secondary">
        {t("common.do the permit check")}
      </Button>
    </TopicLayout>
  );
};

export default IntroPage;
