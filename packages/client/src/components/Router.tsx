import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import LoadingPage from "../pages/LoadingPage";
import { redirectConfig, routeConfig } from "../routes";
import ScrollToTop from "./ScrollToTop";

const Router = () => (
  // BrowserRouter has been moved to `../index.tsx` to make it accissible for other HOC's
  <>
    <ScrollToTop />
    <Suspense fallback={<LoadingPage />}>
      <Switch>
        {redirectConfig.map((redirect) => (
          <Redirect key={redirect.from} {...redirect} />
        ))}
        {routeConfig
          .filter((route) => route.component)
          .map((route, i) => (
            <Route key={i} {...route} />
          ))}
      </Switch>
    </Suspense>
  </>
);

export default Router;
