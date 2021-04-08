import React, { FunctionComponent } from "react";

import { BaseLayout } from "../components/Layouts";
import { isProduction } from "../config";
import { DebugCheckersTable } from "../debug";

// This page is rendered when going to the `/test` route in production. It lists all available permit checks.
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
