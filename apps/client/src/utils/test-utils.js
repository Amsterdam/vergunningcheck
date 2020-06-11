import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "@datapunt/asc-ui";
import { MatomoProvider, createInstance } from "@datapunt/matomo-tracker-react";
import { render } from "@testing-library/react";
import dotenv from "dotenv-flow";
import React from "react";

import { getTestClient } from "../apolloClient";
import { matomo } from "../config";
import Context, { defaultValues } from "../context";

dotenv.config();

const AllTheProviders = ({ children, mocks }) => (
  <Context.Provider value={defaultValues}>
    <ApolloProvider client={getTestClient(mocks ? mocks : [])}>
      <ThemeProvider>
        <MatomoProvider value={createInstance(matomo)}>
          {children}
        </MatomoProvider>
      </ThemeProvider>
    </ApolloProvider>
  </Context.Provider>
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
