import React, { Suspense } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

import Layout from "../components/Layouts/TopicLayout";
import Loading from "../components/Loading";
import Nav from "../components/Nav";
import { actions, sections } from "../config/matomo";
import { useChecker, useTopic, useTracking } from "../hooks";
import { geturl, routes } from "../routes";
import RedirectPage from "./RedirectPage";

const IntroPage: React.FC = () => {
  const history = useHistory();
  const { matomoTrackEvent } = useTracking();
  const checker = useChecker();
  const topic = useTopic();

  const { hasIMTR, text, intro, redirectToOlo } = topic;

  if (redirectToOlo) {
    return <RedirectPage topic={topic} />;
  }

  // Here starts the separation of the IMTR flow and the non-IMTR flow (which we call OLO flow):
  if (!hasIMTR) {
    // OLO flow now skips the intro page and goes directly to location page
    history.replace(geturl(routes.oloLocationInput, topic));
    return null;
  }

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
    <Layout>
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

export default IntroPage;
