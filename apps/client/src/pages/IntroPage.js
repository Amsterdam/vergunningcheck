import React, { Suspense } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

import Layout from "../components/Layouts/DefaultLayout";
import Loading from "../components/Loading";
import Nav from "../components/Nav";
import { actions, sections } from "../config/matomo";
import withChecker from "../hoc/withChecker";
import withTracking from "../hoc/withTracking";
import { geturl, routes } from "../routes";

const IntroPage = ({ checker, matomoTrackEvent, topic }) => {
  const history = useHistory();

  const { intro, text } = topic;

  const introComponentPath = intro || "shared/DynamicIMTRIntro";

  const Intro = React.lazy(() => import(`../intros/${introComponentPath}`));

  const goToNext = () => {
    // @TODO: Change and refactor this because the next step is not always LOCATION_INPUT
    matomoTrackEvent({
      action: actions.ACTIVE_STEP,
      name: sections.LOCATION_INPUT,
    });

    history.push(geturl(routes.checker, topic));
  };

  return (
    <Layout heading={text.heading}>
      <Helmet>
        <title>Inleiding - {text.heading}</title>
      </Helmet>
      <Suspense fallback={<Loading />}>
        <Intro checker={checker} />
      </Suspense>
      <Nav noMarginBottom onGoToNext={goToNext} showNext />
    </Layout>
  );
};

export default withTracking(withChecker(IntroPage));
