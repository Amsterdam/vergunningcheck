import React, { Suspense } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import LoadingPage from "../pages/LoadingPage";
import { redirectConfig, routeConfig } from "../routes";
import ScrollToTop from "./ScrollToTop";

const Router = (props) => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<LoadingPage />}>
        <Switch>
          {redirectConfig.map(([from, to]) => (
            <Redirect key={from} {...{ from, to }} />
          ))}
          {routeConfig
            .filter((route) => route.component)
            .map((route, i) => {
              if (!route.redirect) {
                return <Route key={i} {...route} />;
              } else {
                return route.redirect.map((redirect, i) => (
                  <Redirect
                    status={301}
                    exact
                    from={redirect.from}
                    to={redirect.to}
                  />
                ));
              }
            })}
        </Switch>
      </Suspense>{" "}
    </BrowserRouter>
  );
};

export default Router;
