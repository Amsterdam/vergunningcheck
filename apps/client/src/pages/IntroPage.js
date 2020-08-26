import React, { Suspense } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

import Layout from "../components/Layouts/DefaultLayout";
import Loading from "../components/Loading";
import Nav from "../components/Nav";
import { getDataNeed } from "../config/autofill";
import withChecker from "../hoc/withChecker";
import { geturl, routes } from "../routes";

const dataNeedToIntroMapping = {
  address: "shared/LocationIntro",
};

const IntroPage = ({ topic, checker }) => {
  const history = useHistory();

  const { text, intro } = topic;
  const dataNeed = getDataNeed(checker);

  const introComponentPath = intro
    ? intro
    : dataNeed
    ? dataNeedToIntroMapping[dataNeed]
    : "shared/DefaultIntro";

  const Intro = React.lazy(() => import(`../intros/${introComponentPath}`));

  return (
    <Layout heading={text.heading}>
      <Helmet>
        <title>Inleiding - {text.heading}</title>
      </Helmet>
      <Suspense fallback={<Loading />}>
        <Intro />
      </Suspense>
      <Nav
        onGoToNext={() => history.push(geturl(routes.checker, topic))}
        showNext
        style={{ marginBottom: 0 }}
      />
    </Layout>
  );
};

export default withChecker(IntroPage);
