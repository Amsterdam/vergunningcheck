import React, { Suspense } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

import Layout from "../components/Layouts/DefaultLayout";
import Loading from "../components/Loading";
import Nav from "../components/Nav";
import { actions, sections } from "../config/matomo";
import withTopic from "../hoc/withTopic";
import withTracking from "../hoc/withTracking";
import { geturl, routes } from "../routes";

const IntroPage = ({ matomoTrackEvent, topic }) => {
  const history = useHistory();
  const { intro, text } = topic;
  const Intro = React.lazy(() => import(`../intros/${intro}`));

  const goToNext = () => {
    history.push(geturl(routes.checker, topic));

    // @TODO: Change and refactor this because the next step is not always LOCATION_INPUT
    matomoTrackEvent({
      action: actions.ACTIVE_STEP,
      name: sections.LOCATION_INPUT,
    });
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
