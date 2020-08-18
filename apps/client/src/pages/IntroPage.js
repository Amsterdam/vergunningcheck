import React, { Suspense } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

import Layout from "../components/Layouts/DefaultLayout";
import Loading from "../components/Loading";
import Nav from "../components/Nav";
import { getDataNeed } from "../config/autofill";
import withChecker from "../hoc/withChecker";
import DefaultIntro from "../intros/shared/DefaultIntro";
import LocationIntro from "../intros/shared/LocationIntro";
import { geturl, routes } from "../routes";

const IntroPage = ({ topic, checker }) => {
  const history = useHistory();

  const { text, intro } = topic;
  const dataNeed = getDataNeed(checker);
  console.log("dataNeed", dataNeed);

  const Intro = intro
    ? React.lazy(() => import(`../intros/${intro}`))
    : dataNeed
    ? LocationIntro
    : DefaultIntro;

  return (
    <Layout heading={text.heading}>
      <Helmet>
        <title>Inleiding - {text.heading}</title>
      </Helmet>
      <Suspense fallback={<Loading />}>
        <Intro />
      </Suspense>
      <Nav
        showNext
        onGoToNext={() => history.push(geturl(routes.checker, topic))}
      />
    </Layout>
  );
};

export default withChecker(IntroPage);
