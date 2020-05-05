import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { routeConfig } from "../routes";
import ScrollToTop from "./ScrollToTop";

const Router = (props) => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
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
