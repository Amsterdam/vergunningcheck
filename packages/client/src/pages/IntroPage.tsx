import React, { Suspense } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

import { TopicLayout } from "../components/Layouts";
import Loading from "../components/Loading";
import Nav from "../components/Nav";
import { actions, sections } from "../config/matomo";
import { useTopic, useTracking } from "../hooks";
import { IntroProps } from "../intros";
import { geturl, routes } from "../routes";

const IntroPage: React.FC = () => {
  const history = useHistory();
  const { matomoTrackEvent } = useTracking();

  const topic = useTopic();
  const { hasIMTR, text, intro } = topic;

  // Here starts the separation of the IMTR flow and the non-IMTR flow (which we call OLO flow):
  if (!hasIMTR) {
    // OLO flow now skips the intro page and goes directly to location page
    history.replace(geturl(routes.oloLocationInput, topic));
    return null;
  }

  const introComponentPath = intro || "shared/DynamicIMTRIntro";
  const Intro = React.lazy(
    () => import(`../intros/${introComponentPath}`)
  ) as IntroProps;

  const goToNext = () => {
    // @TODO: Change and refactor this because the next step is not always LOCATION_INPUT
    matomoTrackEvent({
      action: actions.ACTIVE_STEP,
      name: sections.LOCATION_INPUT,
    });

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
