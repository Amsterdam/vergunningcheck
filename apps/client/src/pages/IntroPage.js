import React, { Suspense } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

import Layout from "../components/Layouts/DefaultLayout";
import Loading from "../components/Loading";
import Nav from "../components/Nav";
import withTopic from "../hoc/withTopic";
import { geturl, routes } from "../routes";

const IntroPage = ({ topic }) => {
  const history = useHistory();
  const { text, intro } = topic;
  const Intro = React.lazy(() => import(`../intros/${intro}`));

  const goToNext = () => {
    history.push(geturl(routes.wrapper, topic));
  };
  return (
    <Layout>
      <Helmet>
        <title>Inleiding - {text.heading}</title>
      </Helmet>
      <Suspense fallback={<Loading />}>
        <Intro />
      </Suspense>
      <Nav showNext onGoToNext={() => goToNext()} />
    </Layout>
  );
};

export default withTopic(IntroPage);
