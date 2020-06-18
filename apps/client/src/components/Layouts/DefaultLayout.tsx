import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import BaseLayout from "./BaseLayout";
import withTracking from "../../hoc/withTracking";

interface DefaultLayoutProps {
  heading: string;
  children: React.ReactNode;
  MatomoPageView: Function;
}

function DefaultLayout({
  heading,
  children,
  MatomoPageView,
}: DefaultLayoutProps) {
  const { location } = useHistory();

  useEffect(() => {
    MatomoPageView();
  }, [MatomoPageView, location]);

  return <BaseLayout {...{ heading, children }} />;
}

export default withTracking(DefaultLayout);
