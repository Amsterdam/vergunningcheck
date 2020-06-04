import React from "react";
import dotenv from "dotenv-flow";
import { render } from "@testing-library/react";
import { ApolloProvider } from "@apollo/react-hooks";
import { MatomoProvider, createInstance } from "@datapunt/matomo-tracker-react";
import { ThemeProvider } from "@datapunt/asc-ui";
import { SessionProvider } from "../context";
import { matomo } from "../config";
import { getTestClient } from "../apolloClient";

dotenv.config();

const AllTheProviders = ({ children, mocks }) => (
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
