import React from "react";

import Loading from "../components/Loading";
import Layout from "../components/Layouts/BaseLayout";
import { Helmet } from "react-helmet";

const LoadingPage = () => (
  <Layout>
    <Helmet>
      <title>Laden... - Amsterdam Vergunningcheck</title>
    </Helmet>
    <Loading />
  </Layout>
);

export default LoadingPage;
