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

  const permitName =
    checker?.permits.length === 1 ? checker.permits[0].name : null;
  const title = `Inleiding${text?.heading && ` - ${text.heading}`}`;

  const dataNeed = getDataNeed(checker);
  debugger;
  const Intro = intro
    ? React.lazy(() => import(`../intros/${intro}`))
    : dataNeed
    ? LocationIntro
    : DefaultIntro;

  return (
    <Layout heading={text?.heading || permitName}>
      <Helmet>
        <title>{title}</title>
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
