import React, { Suspense } from "react";
import { Helmet } from "react-helmet";

import Form from "../components/Form";
import Layout from "../components/Layouts/DefaultLayout";
import Loading from "../components/Loading";
import Nav from "../components/Nav";
import { getDataNeedPageOrNext } from "../config/autofill";
import withChecker from "../hoc/withChecker";
import { autofillRoutes, geturl, routes } from "../routes";

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
      <Form
        action={() => {
          const response = geturl(
            getDataNeedPageOrNext(checker, autofillRoutes, routes),
            topic
          );
          checker.next();
          console.log(response);
          return response;
        }}
      >
        <Nav showNext />
      </Form>
    </Layout>
  );
};

export default withChecker(IntroPage);
