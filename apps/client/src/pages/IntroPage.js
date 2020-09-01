import React, { Suspense } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

import Layout from "../components/Layouts/DefaultLayout";
import Loading from "../components/Loading";
import Nav from "../components/Nav";
import { actions, eventNames } from "../config/matomo";
import withTopic from "../hoc/withTopic";
import withTracking from "../hoc/withTracking";
import { geturl, routes } from "../routes";

const IntroPage = ({ topic, matomoTrackEvent }) => {
  const history = useHistory();
  const { text, intro } = topic;
  const Intro = React.lazy(() => import(`../intros/${intro}`));

  const goToNext = () => {
    matomoTrackEvent({
      category: topic.name,
      action: actions.CLICK_INTERNAL_NAVIGATION,
      name: `${eventNames.NEXT} - ${eventNames.INTRO}`,
    });

    history.push(geturl(routes.checker, topic));
  };

  return (
    <Layout>
      <Helmet>
        <title>Inleiding - {text.heading}</title>
      </Helmet>
      <Suspense fallback={<Loading />}>
        <Intro />
      </Suspense>
      <Nav noMarginBottom onGoToNext={goToNext} showNext />
    </Layout>
  );
};

export default withTracking(withTopic(IntroPage));
