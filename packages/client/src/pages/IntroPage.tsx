import React, { FunctionComponent, Suspense, lazy } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

import { TopicLayout } from "../components/Layouts";
import Loading from "../components/Loading";
import Nav from "../components/Nav";
import { useTopic } from "../hooks";
import { geturl, routes } from "../routes";

const IntroPage: FunctionComponent = () => {
  const history = useHistory();

  const topic = useTopic();
  const { text, intro } = topic;

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
      <Nav noMarginBottom onGoToNext={goToNext} showNext />
    </TopicLayout>
  );
};

export default IntroPage;
// sdfsdfsfsdf
