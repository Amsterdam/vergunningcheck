import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { redirectConfig, routeConfig } from "../routes";
import ScrollToTop from "./ScrollToTop";

const Router = (props) => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        {redirectConfig.map(([from, to]) => (
          <Redirect key={from} {...{ from, to }} />
        ))}
        {routeConfig
          .filter((route) => route.component)
          .map((route, i) => (
            <Route key={i} {...route} />
          ))}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
