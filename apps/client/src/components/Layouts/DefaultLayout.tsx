import React from "react";

import withTracking from "../../hoc/withTracking";
import BaseLayout from "./BaseLayout";

interface DefaultLayoutProps {
  heading: string;
  children: React.ReactNode;
}

function DefaultLayout({ heading, children }: DefaultLayoutProps) {
  return <BaseLayout {...{ heading, children }} />;
}

export default withTracking(DefaultLayout);
