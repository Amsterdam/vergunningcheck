import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import BaseLayout from "./BaseLayout";
import withTracking from "../../hoc/withTracking";

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
  }, [location, matomoPageView]);

  return <BaseLayout {...{ heading, children }} />;
}

export default withTracking(DefaultLayout);
