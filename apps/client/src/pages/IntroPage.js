import React, { Suspense } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

import Layout from "../components/Layouts/DefaultLayout";
import Loading from "../components/Loading";
import Nav from "../components/Nav";
import withChecker from "../hoc/withChecker";
import { geturl, routes } from "../routes";

const IntroPage = ({ topic, checker }) => {
  const history = useHistory();

  const { text, intro } = topic;

  const introComponentPath = intro ? intro : "shared/DynamicSTTRIntro";

  const Intro = React.lazy(() => import(`../intros/${introComponentPath}`));

  return (
    <Layout heading={text.heading}>
      <Helmet>
        <title>Inleiding - {text.heading}</title>
      </Helmet>
      <Suspense fallback={<Loading />}>
        <Intro checker={checker} />
      </Suspense>
      <Nav
        noMarginBottom
        onGoToNext={() => history.push(geturl(routes.checker, topic))}
        showNext
      />
    </Layout>
  );
};

export default withChecker(IntroPage);
