import React, { Suspense } from "react";
import { Helmet } from "react-helmet";

import DebugDecisionTable from "../components/DebugDecisionTable";
import Form from "../components/Form";
import Layout from "../components/Layouts/DefaultLayout";
import Loading from "../components/Loading";
import Nav from "../components/Nav";
import withChecker from "../hoc/withChecker";
import { geturl, routes } from "../routes";

const IntroPage = ({ topic, checker }) => {
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
      <Form action={geturl(routes.wrapper, topic)}>
        <Nav showNext />
      </Form>

      <DebugDecisionTable {...{ topic, checker }} />
    </Layout>
  );
};

export default withChecker(IntroPage);
