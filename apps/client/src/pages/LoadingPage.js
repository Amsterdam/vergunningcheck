import React from "react";

import Loading from "../components/Loading";
import Layout from "../components/Layouts/BaseLayout";
import Helmet from "react-helmet";

const IntroPage = () => (
  <Layout>
    <Helmet>
      <title>Laden... - Amsterdam Vergunningchecker</title>
    </Helmet>
    <Loading />
  </Layout>
);

export default IntroPage;
