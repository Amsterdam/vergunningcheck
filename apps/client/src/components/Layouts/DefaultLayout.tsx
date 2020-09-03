import React, { useEffect, useState } from "react";
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
  const [oldLocation, setLocation] = useState("");

  useEffect(() => {
    if (location.pathname !== oldLocation) {
      matomoPageView();
      setLocation(location.pathname);
    }
  }, [location, matomoPageView, oldLocation]);

  return <BaseLayout {...{ heading, children }} />;
}

export default withTracking(DefaultLayout);
