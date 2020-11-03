import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { MockLink } from "@apollo/client/testing";
import { ThemeProvider } from "@datapunt/asc-ui";
import { MatomoProvider, createInstance } from "@datapunt/matomo-tracker-react";
import { render } from "@testing-library/react";
import dotenv from "dotenv-flow";
import React from "react";

import matchMedia from "../__mocks__/matchMedia";
import { CheckerProvider } from "../CheckerContext";
import { matomo } from "../config/matomo";
import { SessionProvider } from "../SessionContext";

dotenv.config();

Object.defineProperty(window, "matchMedia", matchMedia);

window.open = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({ pathname: "/dakkapel-plaatsen" }),
  useHistory: () => ({
    location: {
      pathname: "/dakkapel-plaatsen",
    },
  }),
}));

const AllTheProviders = ({ children, mocks }) => (
  <SessionProvider>
    <CheckerProvider>
      <ApolloProvider client={getTestClient(mocks ? mocks : [])}>
        <ThemeProvider>
          <MatomoProvider value={createInstance(matomo)}>
            {children}
          </MatomoProvider>
        </ThemeProvider>
      </ApolloProvider>
    </CheckerProvider>
  </SessionProvider>
);

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
