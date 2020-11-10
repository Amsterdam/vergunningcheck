import React from "react";
import { Helmet } from "react-helmet";

import Error from "../components/Error";
import { BaseLayout } from "../components/Layouts";

type Props = {
  error: Error;
};

const ErrorPage: React.FC<Props> = ({ error }) => (
  <BaseLayout>
    <Helmet>
      <title>Er is een fout opgetreden - Amsterdam Vergunningcheck</title>
    </Helmet>
    <Error stack={error.stack} content={error.message} />
  </BaseLayout>
);

export default ErrorPage;
