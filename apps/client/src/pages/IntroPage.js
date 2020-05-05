import React, { Suspense } from "react";
import { routes, geturl } from "../routes";
import withTopic from "../hoc/withTopic";
import withOloRedirect from "../hoc/withOloRedirect";

import Loading from "../components/Loading";
import Form from "../components/Form";
import Nav from "../components/Nav";
import Layout from "../components/Layouts/DefaultLayout";
import Helmet from "react-helmet";

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
