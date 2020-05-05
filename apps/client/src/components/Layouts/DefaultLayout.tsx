import React from "react";
import { useHistory } from "react-router-dom";
import { useMatomo } from "@datapunt/matomo-tracker-react";
import BaseLayout from "./BaseLayout";

function DefaultLayout(props: { heading: string; children: React.ReactNode }) {
  const { location } = useHistory();
  const { trackPageView } = useMatomo();

  React.useEffect(() => {
    // @datapunt Track Page View https://github.com/Amsterdam/matomo-tracker/tree/master/packages/react
    trackPageView({});
  }, [location, trackPageView]);

  return <BaseLayout {...props} />;
}

export default DefaultLayout;
