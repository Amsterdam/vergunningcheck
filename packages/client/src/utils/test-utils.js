import "../i18n";

import { ThemeProvider } from "@amsterdam/asc-ui";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { MockLink } from "@apollo/client/testing";
import { MatomoProvider, createInstance } from "@datapunt/matomo-tracker-react";
import { render } from "@testing-library/react";
import dotenv from "dotenv-flow";
import React from "react";

import { matomo } from "../config/matomo";
import { SessionProvider } from "../context";

dotenv.config();

const AllTheProviders = ({ children, mocks }) => {
  return (
    <SessionProvider>
      <ApolloProvider client={getTestClient(mocks ? mocks : [])}>
        <ThemeProvider>
          <MatomoProvider value={createInstance(matomo)}>
            {children}
          </MatomoProvider>
        </ThemeProvider>
      </ApolloProvider>
    </SessionProvider>
  );
};

export const getTestClient = (mocks) =>
  new ApolloClient({
    link: new MockLink(mocks, true),
    cache: new InMemoryCache(),
  });

const customRender = (ui, options, mocks) => {
  // Added new Component to be able to pass the `mocks` prop
  const WrapperWithMocks = ({ children }) => (
    <AllTheProviders mocks={mocks}>{children}</AllTheProviders>
  );
  return render(ui, { wrapper: WrapperWithMocks, ...options });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
