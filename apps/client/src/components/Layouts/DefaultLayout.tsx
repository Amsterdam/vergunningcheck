import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useTracking } from "../../hooks";
import BaseLayout from "./BaseLayout";

interface DefaultLayoutProps {
  heading?: string;
  children: React.ReactNode;
}

function DefaultLayout({ heading, children }: DefaultLayoutProps) {
  const { location } = useHistory();
  const { matomoPageView } = useTracking();

  useEffect(() => {
    matomoPageView();
    // @TODO: We need to fix this!
    //eslint-disable-next-line
  }, [location.pathname]);

  return <BaseLayout {...{ heading, children }} />;
}

export default DefaultLayout;
