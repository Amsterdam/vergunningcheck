/* istanbul ignore file */
import React from "react";

import { BaseLayout } from "../components/Layouts";
import { isProduction } from "../config";
import { DebugCheckersTable } from "../debug";

const HomePage: React.FC = () => {
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
