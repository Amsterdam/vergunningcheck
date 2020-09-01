import React, { Suspense } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

import Layout from "../components/Layouts/DefaultLayout";
import Loading from "../components/Loading";
import Nav from "../components/Nav";
import { useTopic } from "../hooks";
import { geturl, routes } from "../routes";

const IntroPage = () => {
  const history = useHistory();
  const topic = useTopic();
  const { text, intro } = topic;
  const Intro = React.lazy(() => import(`../intros/${intro}`));

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

export default IntroPage;
