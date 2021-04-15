import React, { FunctionComponent, Suspense } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

import { TopicLayout } from "../components/Layouts";
import Loading from "../components/Loading";
import Markdown from "../components/Markdown";
import Nav from "../components/Nav";
import { sections } from "../config/matomo";
import { useTopic } from "../hooks";
import { geturl, routes } from "../routes";
import { Topic } from "../types";

const IntroPage: FunctionComponent = () => {
  const history = useHistory();

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
      <Nav noMarginBottom onGoToNext={goToNext} showNext />
    </TopicLayout>
  );
};

export default IntroPage;
