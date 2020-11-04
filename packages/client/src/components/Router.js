import React, { Suspense } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import ErrorPage from "../pages/ErrorPage";
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
              <ErrorPage key={i}>
                <Route {...route} />
              </ErrorPage>
            ))}
        </Switch>
      </Suspense>{" "}
    </BrowserRouter>
  );
};

export default Router;
