import React, { FunctionComponent } from "react";

import { BaseLayout } from "../components/Layouts";
import { isProduction } from "../config";
import { DebugCheckersTable } from "../debug";

const HomePage: FunctionComponent = () => {
  if (isProduction) {
    localStorage.setItem("doNotTrack", "true");
  }

  return (
    <BaseLayout>
      <DebugCheckersTable />
    </BaseLayout>
  );
};

export default HomePage;
