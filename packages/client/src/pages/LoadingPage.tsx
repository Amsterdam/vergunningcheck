import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";

import { Loading } from "../atoms";
import { BaseLayout } from "../components/Layouts";

const LoadingPage: FunctionComponent = () => (
  <BaseLayout disablePageView>
    <Helmet>
      <title>Laden... - Amsterdam Vergunningcheck</title>
    </Helmet>
    <Loading />
  </BaseLayout>
);

export default LoadingPage;
