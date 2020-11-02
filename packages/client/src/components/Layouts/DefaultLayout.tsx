import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import withTracking from "../../hoc/withTracking";
import BaseLayout from "./BaseLayout";

interface DefaultLayoutProps {
  heading?: string;
  children: React.ReactNode;
  matomoPageView: () => void;
  formTitle?: string;
}

function DefaultLayout({
  heading,
  children,
  matomoPageView,
  formTitle,
}: DefaultLayoutProps) {
  const { location } = useHistory();

  useEffect(() => {
    matomoPageView();
    // @TODO: We need to fix this!
    //eslint-disable-next-line
  }, [location.pathname]);

  return <BaseLayout {...{ children, heading, formTitle }} />;
}

export default withTracking(DefaultLayout);
