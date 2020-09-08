import React, { Suspense } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

import Layout from "../components/Layouts/BaseLayout";
import Loading from "../components/Loading";
import Nav from "../components/Nav";
import withTopic from "../hoc/withTopic";
import withTracking from "../hoc/withTracking";
import { geturl, routes } from "../routes";

const IntroPage = ({ matomoPageView, topic }) => {
  const history = useHistory();
  const { text, intro } = topic;
  const Intro = React.lazy(() => import(`../intros/${intro}`));

  matomoPageView();

  return (
    <Layout>
      <Helmet>
        <title>Inleiding - {text.heading}</title>
      </Helmet>
      <Suspense fallback={<Loading />}>
        <Intro />
      </Suspense>
      <Nav
        noMarginBottom
        onGoToNext={() => history.push(geturl(routes.checker, topic))}
        showNext
      />
    </Layout>
  );
};

export default withTracking(withTopic(IntroPage));
