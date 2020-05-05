import React from "react";
import { Heading, Paragraph } from "@datapunt/asc-ui";
import Layout from "../components/Layouts/DefaultLayout";
import Helmet from "react-helmet";

const NotFoundPage = () => (
  <Layout>
    <Helmet>
      <title>Pagina niet gevonden - Amsterdam Vergunningchecker</title>
    </Helmet>
    <Heading forwardedAs="h2">Deze pagina is niet gevonden.</Heading>
    <Paragraph>Helaas</Paragraph>
  </Layout>
);

export default NotFoundPage;
