import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import withTracking from "../../hoc/withTracking";
import BaseLayout from "./BaseLayout";

interface DefaultLayoutProps {
  heading: string;
  children: React.ReactNode;
  matomoPageView: Function;
}

function DefaultLayout({
  heading,
  children,
  matomoPageView,
}: DefaultLayoutProps) {
  const { location } = useHistory();

  useEffect(() => {
    matomoPageView();
    // @TODO: We need to fix this!
    //eslint-disable-next-line
  }, [location.pathname]);

  return <BaseLayout {...{ heading, children }} />;
}

export default withTracking(DefaultLayout);