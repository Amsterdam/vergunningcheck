import React, { Suspense, useContext } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

import Layout from "../components/Layouts/DefaultLayout";
import Loading from "../components/Loading";
import Nav from "../components/Nav";
import { SessionContext } from "../context";
import withTopic from "../hoc/withTopic";
import { geturl, routes } from "../routes";

const IntroPage = ({ topic }) => {
  const sessionContext = useContext(SessionContext);
  const history = useHistory();
  const { text, intro, slug } = topic;
  const Intro = React.lazy(() => import(`../intros/${intro}`));

  const goToNext = () => {
    sessionContext.setSessionData([
      slug,
      {
        finishedLocation: false,
        finishedQuestions: false,
      },
    ]);
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
