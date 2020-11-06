import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "@amsterdam/asc-assets/static/fonts/fonts.css";

import "./i18n";

import { GlobalStyle, ThemeProvider, themeColor } from "@amsterdam/asc-ui";
import { ApolloProvider } from "@apollo/client";
import { MatomoProvider, createInstance } from "@datapunt/matomo-tracker-react";
import { init } from "@sentry/browser";
import dotenv from "dotenv-flow";
import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";

import apolloClient from "./apolloClient";
import { CheckerProvider } from "./CheckerContext";
import Router from "./components/Router";
import { matomo } from "./config/matomo";
import { sentryConfig } from "./config/sentry";
import { unregister } from "./serviceWorker";
import { SessionProvider } from "./SessionContext";

dotenv.config();

// Enabling hot reloading (injecting style changes without hard reload)
if (module.hot) {
  module.hot.accept();
}

const AppGlobalStyle = createGlobalStyle`
  body {
    min-height: 100vh;
    background-color: ${themeColor("tint", "level3")};
  }
`;

init(sentryConfig);

ReactDOM.render(
  <SessionProvider>
    <CheckerProvider>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider>
          <GlobalStyle />
          <AppGlobalStyle />
          <MatomoProvider value={createInstance(matomo)}>
            <Router />
          </MatomoProvider>
        </ThemeProvider>
      </ApolloProvider>
    </CheckerProvider>
  </SessionProvider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
unregister();
