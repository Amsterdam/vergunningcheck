import React, { Suspense } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import LoadingPage from "../pages/LoadingPage";
import { redirectConfig, routeConfig } from "../routes";
import ScrollToTop from "./ScrollToTop";

const Router = () => {
  return (
    <BrowserRouter>
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
      </Suspense>{" "}
    </BrowserRouter>
  );
};

export default Router;
