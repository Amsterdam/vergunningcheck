import React, { Suspense } from "react";
import { Helmet } from "react-helmet";

import Form from "../components/Form";
import Layout from "../components/Layouts/DefaultLayout";
import Loading from "../components/Loading";
import Nav from "../components/Nav";
import withOloRedirect from "../hoc/withOloRedirect";
import withTopic from "../hoc/withTopic";
import { geturl, routes } from "../routes";

const IntroPage = ({ topic: { text, slug, intro } }) => {
  const Intro = React.lazy(() => import(`../intros/${intro}`));
  return (
    <Layout>
      <Helmet>
        <title>Inleiding - {text.heading}</title>
      </Helmet>
      <Suspense fallback={<Loading />}>
        <Intro />
      </Suspense>
      <Form action={geturl(routes.location, { slug })}>
        <Nav showNext />
      </Form>
    </Layout>
  );
};

export default withOloRedirect(withTopic(IntroPage));
