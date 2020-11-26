import React, { Suspense, useContext } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

import { CheckerContext } from "../CheckerContext";
import { TopicLayout } from "../components/Layouts";
import Loading from "../components/Loading";
import Nav from "../components/Nav";
import { useSlug, useTopic, useTopicData } from "../hooks";
import { IntroProps } from "../intros";
import { geturl, routes } from "../routes";

const IntroPage: React.FC = () => {
  const history = useHistory();
  const checkerContext = useContext(CheckerContext);
  const { topicData } = useTopicData();
  const slug = useSlug();

  const topic = useTopic();
  const { text, intro } = topic;

  const introComponentPath = intro || "shared/DynamicIMTRIntro";
  const Intro = React.lazy(
    () => import(`../intros/${introComponentPath}`)
  ) as IntroProps;

  const goToNext = () => {
    // Unset the current checker in case the topicData contains an old checker
    if (topicData.type !== slug) {
      checkerContext.setChecker(undefined);
    }
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
