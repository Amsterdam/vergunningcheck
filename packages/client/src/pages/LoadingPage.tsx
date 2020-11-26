import React from "react";
import { Helmet } from "react-helmet";

import { BaseLayout } from "../components/Layouts";
import Loading from "../components/Loading";

const LoadingPage: React.FC = () => (
  <BaseLayout disablePageView>
    <Helmet>
      <title>Laden... - Amsterdam Vergunningcheck</title>
    </Helmet>
    <Loading />
  </BaseLayout>
);

export default LoadingPage;
