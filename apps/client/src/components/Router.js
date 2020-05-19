import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { routeConfig, redirectConfig } from "../routes";
import ScrollToTop from "./ScrollToTop";

const Router = (props) => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        {redirectConfig.map(([from, to]) => (
          <Redirect {...{ from, to }} />
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
