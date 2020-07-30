import React, { Suspense } from "react";
import { Helmet } from "react-helmet";

import DebugDecisionTable from "../components/DebugDecisionTable";
import Form from "../components/Form";
import Layout from "../components/Layouts/DefaultLayout";
import Loading from "../components/Loading";
import Nav from "../components/Nav";
import { getDataNeedPageOrNext } from "../config/autofill";
import withChecker from "../hoc/withChecker";
import DefaultIntro from "../intros/shared/DefaultIntro";
import { autofillRoutes, geturl, routes } from "../routes";

const IntroPage = ({ topic, checker }) => {
  const { text, intro } = topic;
  const title = `Inleiding${text?.heading && ` - ${text.heading}`}`;
  const Intro = intro
    ? React.lazy(() => import(`../intros/${intro}`))
    : DefaultIntro;

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Suspense fallback={<Loading />}>
        <Intro />
      </Suspense>
      <Form
        action={geturl(
          getDataNeedPageOrNext(checker, autofillRoutes, routes),
          topic
        )}
      >
        <Nav showNext />
      </Form>

      <DebugDecisionTable {...{ topic, checker }} />
    </Layout>
  );
};

export default withChecker(IntroPage);
