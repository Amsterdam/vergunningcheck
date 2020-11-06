/* istanbul ignore file */
import React from "react";

import Layout from "../components/Layouts/BaseLayout";
import { isProduction } from "../config";
import { DebugCheckersTable } from "../debug";

const HomePage: React.FC = () => {
  if (isProduction) {
    localStorage.setItem("doNotTrack", "true");
  }

  return (
    <Layout>
      <DebugCheckersTable />
    </Layout>
  );
};

export default HomePage;
