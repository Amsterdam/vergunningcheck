import { Heading, Paragraph } from "@datapunt/asc-ui";
import React from "react";
import { Helmet } from "react-helmet";

import Layout from "../components/Layouts/BaseLayout";
import withTracking from "../hoc/withTracking";

const NotFoundPage = ({ matomoPageView }) => {
  matomoPageView();
  return (
    <Layout>
      <Helmet>
        <title>Pagina niet gevonden - Amsterdam Vergunningcheck</title>
      </Helmet>
      <Heading forwardedAs="h2">Deze pagina is niet gevonden.</Heading>
      <Paragraph>Helaas</Paragraph>
    </Layout>
  );
};

export default withTracking(NotFoundPage);
