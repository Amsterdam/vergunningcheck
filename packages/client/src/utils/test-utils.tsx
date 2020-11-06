import { ThemeProvider } from "@amsterdam/asc-ui";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { MockLink, MockedResponse } from "@apollo/client/testing";
import { MatomoProvider, createInstance } from "@datapunt/matomo-tracker-react";
import { render as reactRender } from "@testing-library/react";
import dotenv from "dotenv-flow";
import React from "react";

import matchMedia from "../__mocks__/matchMedia";
import { CheckerProvider } from "../CheckerContext";
import { matomo } from "../config/matomo";
import { SessionProvider } from "../SessionContext";

export * from "@testing-library/react";

dotenv.config();

Object.defineProperty(window, "matchMedia", matchMedia);

window.open = jest.fn();
window.scrollTo = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as {}),
  useLocation: () => ({ pathname: "/dakkapel-plaatsen" }),
  useHistory: () => ({
    push: jest.fn(),
    location: {
      pathname: "/dakkapel-plaatsen",
    },
  }),
}));

type TestProviderProps = {
  mocks: readonly MockedResponse<Record<string, any>>[];
};

const TestProvider: React.FC<TestProviderProps> = ({
  children,
  mocks = [],
}) => (
  <SessionProvider>
    <CheckerProvider>
      <ApolloProvider client={getTestClient(mocks)}>
        <ThemeProvider>
          <MatomoProvider value={createInstance(matomo)}>
            {children}
          </MatomoProvider>
        </ThemeProvider>
      </ApolloProvider>
    </CheckerProvider>
  </SessionProvider>
);

export const getTestClient = (
  mocks: readonly MockedResponse<Record<string, any>>[]
) =>
  new ApolloClient({
    link: new MockLink(mocks, true),
    cache: new InMemoryCache(),
  });

export const render = (
  ui: any,
  options?: any,
  mocks?: readonly MockedResponse<Record<string, any>>[]
) => {
  // Added new Component to be able to pass the `mocks` prop
  const WrapperWithMocks: React.FC = ({ children }) => (
    <TestProvider mocks={mocks ? mocks : []}>{children}</TestProvider>
  );
  return reactRender(ui, { wrapper: WrapperWithMocks, ...options });
};
