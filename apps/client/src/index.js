import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "@datapunt/asc-assets/static/fonts/fonts.css";

import { ApolloProvider } from "@apollo/react-hooks";
import { GlobalStyle, ThemeProvider, themeColor } from "@datapunt/asc-ui";
import { MatomoProvider, createInstance } from "@datapunt/matomo-tracker-react";
import { Integrations as ApmIntegrations } from "@sentry/apm";
import * as Sentry from "@sentry/browser";
import dotenv from "dotenv-flow";
import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";

import apolloClient from "./apolloClient";
import Router from "./components/Router";
import { SessionProvider } from "./context";
import { matomo } from "./MatomoConfig";
import * as serviceWorker from "./serviceWorker";

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

Sentry.init({
  dsn: "https://2996729fb40e46d18b20f85cd57b4dd3@sentry.data.amsterdam.nl/49",
  release: process.env.REACT_APP_VERSION,
  environment: process.env.NODE_ENV,
  integrations: [new ApmIntegrations.Tracing()],
  tracesSampleRate: 0.25, // must be present and non-zero
});

ReactDOM.render(
  <SessionProvider>
    <ApolloProvider client={apolloClient}>
      <ThemeProvider>
        <GlobalStyle />
        <AppGlobalStyle />
        <MatomoProvider value={createInstance(matomo)}>
          <Router />
        </MatomoProvider>
      </ThemeProvider>
    </ApolloProvider>
  </SessionProvider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
