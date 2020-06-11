import React from "react";
import { Helmet } from "react-helmet";

import { Heading, Paragraph } from "@datapunt/asc-ui";

import Layout from "../components/Layouts/DefaultLayout";

const NotFoundPage = () => (
  <Layout>
    <Helmet>
      <title>Pagina niet gevonden - Amsterdam Vergunningcheck</title>
    </Helmet>
    <Heading forwardedAs="h2">Deze pagina is niet gevonden.</Heading>
    <Paragraph>Helaas</Paragraph>
  </Layout>
);

export default NotFoundPage;
