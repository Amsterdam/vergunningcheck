import { Heading, Paragraph } from "@amsterdam/asc-ui";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import Layout from "../../components/Layouts/TopicLayout";
import { urls } from "../../config";
import { useTopic } from "../../hooks";

const OloRedirectPage: React.FC = () => {
  const topic = useTopic();

  useEffect(() => {
    const redirect = setTimeout(() => {
      window.open(urls.OLO_INTRO, "_self");
    }, 2000);

    return () => {
      clearTimeout(redirect);
    };
  });

  return (
    <Layout>
      <Helmet>
        <title>Redirect naar OLO - {topic.text.heading}</title>
      </Helmet>
      <Heading forwardedAs="h2">Een ogenblik geduld alstublieft</Heading>
      <Paragraph>
        Wij sturen u automatisch door naar de website van het{" "}
        <a title="landelijke Omgevingsloket" href={urls.OLO_INTRO}>
          landelijke Omgevingsloket
        </a>
        .
      </Paragraph>
    </Layout>
  );
};

export default OloRedirectPage;
