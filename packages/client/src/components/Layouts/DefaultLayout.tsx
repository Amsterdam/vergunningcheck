import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import withTracking from "../../hoc/withTracking";
import BaseLayout from "./BaseLayout";

type DefaultLayoutProps = {
  heading?: string;
  matomoPageView: () => void;
  formTitle?: string;
};

const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  heading,
  children,
  matomoPageView,
  formTitle,
}) => {
  const { location } = useHistory();

  useEffect(() => {
    matomoPageView();
    // @TODO: We need to fix this!
    //eslint-disable-next-line
  }, [location.pathname]);

  return <BaseLayout {...{ children, heading, formTitle }} />;
};

export default withTracking(DefaultLayout);
