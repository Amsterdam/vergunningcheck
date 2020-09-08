import React from "react";
import { Helmet } from "react-helmet";

import Error from "../components/Error";
import Layout from "../components/Layouts/BaseLayout";
import withTracking from "../hoc/withTracking";

const ErrorPage = ({ error, matomoPageView }) => {
  matomoPageView();
  return (
    <Layout>
      <Helmet>
        <title>Er is een fout opgetreden - Amsterdam Vergunningcheck</title>
      </Helmet>
      <Error stack={error.stack} content={error.message} />
    </Layout>
  );
};

export default withTracking(ErrorPage);
