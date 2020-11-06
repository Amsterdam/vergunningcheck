import { Heading, Paragraph } from "@amsterdam/asc-ui";
import React from "react";
import { Helmet } from "react-helmet";

import Layout from "../components/Layouts/TopicLayout";

const NotFoundPage: React.FC = () => (
  <Layout>
    <Helmet>
      <title>Pagina niet gevonden - Amsterdam Vergunningcheck</title>
    </Helmet>
    <Heading forwardedAs="h2">Deze pagina is niet gevonden.</Heading>
    <Paragraph>Helaas</Paragraph>
  </Layout>
);

export default NotFoundPage;
