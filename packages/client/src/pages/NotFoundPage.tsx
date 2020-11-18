import { Heading, Paragraph } from "@amsterdam/asc-ui";
import React from "react";
import { Helmet } from "react-helmet";

import { BaseLayout } from "../components/Layouts";

const NotFoundPage: React.FC = () => (
  <BaseLayout>
    <Helmet>
      <title>Pagina niet gevonden - Amsterdam Vergunningcheck</title>
    </Helmet>
    <Heading forwardedAs="h2">Deze pagina is niet gevonden.</Heading>
    <Paragraph>Helaas</Paragraph>
  </BaseLayout>
);

export default NotFoundPage;