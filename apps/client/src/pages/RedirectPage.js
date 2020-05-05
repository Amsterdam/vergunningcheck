import React, { useEffect } from "react";
import Helmet from "react-helmet";
import { Paragraph } from "@datapunt/asc-ui";
import { OLO } from "../config";
import Layout from "../components/Layouts/DefaultLayout";

const RedirectPage = ({ topic }) => {
  useEffect(() => {
    const redirect = setTimeout(() => {
      window.open(OLO.intro, "_self");
    }, 2000);

    return () => {
      clearTimeout(redirect);
    };
  });

  return (
    <Layout heading="Een ogenblik geduld alstublieft">
      <Helmet>
        <title>Redirect naar OLO - {topic.text.heading}</title>
      </Helmet>
      <Paragraph>
        Wij sturen u automatisch door naar de website van het{" "}
        <a title="landelijke Omgevingsloket" href={OLO.intro}>
          landelijke Omgevingsloket
        </a>
        .
      </Paragraph>
    </Layout>
  );
};

export default RedirectPage;
