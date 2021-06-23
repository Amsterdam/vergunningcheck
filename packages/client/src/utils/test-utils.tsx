import "../i18n";

import { TopicType, PreQuestionComponent } from "../types";
import { ThemeProvider } from "@amsterdam/asc-ui";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { MockLink, MockedResponse } from "@apollo/client/testing";
import { MatomoProvider, createInstance } from "@datapunt/matomo-tracker-react";
import { render as reactRender } from "@testing-library/react";
import dotenv from "dotenv-flow";
import React, { FunctionComponent } from "react";
import { BrowserRouter } from "react-router-dom";

import matchMedia from "../__mocks__/matchMedia";
import { CheckerProvider } from "../CheckerContext";
import { matomo } from "../config/matomo";
import { SessionProvider } from "../SessionContext";

export * from "@testing-library/react";

dotenv.config({
  // With this option you can suppress all the console outputs except errors and deprecation warnings.
  silent: true,
});

Object.defineProperty(window, "matchMedia", matchMedia);

window.open = jest.fn();
window.scrollTo = jest.fn();

export const mockMatomoTrackEvent = jest.fn();
export const mockMatomoPageView = jest.fn();
export const mockHistoryReplace = jest.fn();
export const mockHistoryPush = jest.fn();

jest.mock("../hooks/useTracking", () => {
  return jest.fn(() => ({
    matomoTrackEvent: mockMatomoTrackEvent,
    matomoPageView: mockMatomoPageView,
  }));
});

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as {}),
  useLocation: () => ({
    pathname: "/dakkapel-plaatsen",
  }),
  useParams: () => ({ slug: "dakkapel-plaatsen" }),
  useHistory: () => ({
    push: mockHistoryPush,
    replace: mockHistoryReplace,
    location: {
      pathname: "/dakkapel-plaatsen",
    },
  }),
}));

export const testTopic = {
  intro: "DakkapelIntro",
  name: "Dakkapel plaatsen",
  preQuestions: [PreQuestionComponent.MULTIPLE_CHECKERS],
  slug: "dakkapel-plaatsen",
  text: {
    heading: "Vergunningcheck dakkapel plaatsen",
    locationIntro: "Voer het adres in waar u de dakkapel wilt gaan plaatsen",
  },
  type: TopicType.PERMIT_CHECK,
  userMightNotNeedPermit: true,
}

type TestProviderProps = {
  mocks: readonly MockedResponse<Record<string, any>>[];
};

const TestProvider: FunctionComponent<TestProviderProps> = ({
  children,
  mocks = [],
}) => (
  <BrowserRouter>
    <CheckerProvider>
      <SessionProvider>
        <ApolloProvider client={getTestClient(mocks)}>
          <ThemeProvider>
            <MatomoProvider value={createInstance(matomo)}>
              {children}
            </MatomoProvider>
          </ThemeProvider>
        </ApolloProvider>
      </SessionProvider>
    </CheckerProvider>
  </BrowserRouter>
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
  const WrapperWithMocks: FunctionComponent = ({ children }) => (
    <TestProvider mocks={mocks ? mocks : []}>{children}</TestProvider>
  );
  return reactRender(ui, { wrapper: WrapperWithMocks, ...options });
};
