import React, { ComponentProps } from "react";

import addressMock from "../../__mocks__/addressMock";
import addressMockNoMonument from "../../__mocks__/addressMockNoMonument";
import addressMockNoRestrictions from "../../__mocks__/addressMockNoRestrictions";
import addressMockNoZoningplans from "../../__mocks__/addressMockNoZoningplans";
import { CheckerProvider } from "../../CheckerContext";
import { render, screen } from "../../utils/test-utils";
import LocationSummary from "./LocationSummary";

// Somehow this testfile needs to reinitialize `pathname`
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as {}),
  useLocation: () => ({
    pathname: "/dakkapel-plaatsen",
  }),
}));

const monumentText = "Het gebouw is een gemeentelijk monument.";
const noMonumentText = "Het gebouw is geen monument.";
const nationalCityScapeText =
  "Het gebouw ligt in een rijksbeschermd stads- of dorpsgezicht.";
const municipalCityScapeText =
  "Het gebouw ligt in een gemeentelijk beschermd stads- of dorpsgezicht.";
const noCityScapeText =
  "Het gebouw ligt niet in een beschermd stads- of dorpsgezicht.";

describe("LocationSummary", () => {
  const WrapperWithContext = (
    props: ComponentProps<typeof LocationSummary>
  ) => (
    <CheckerProvider>
      <LocationSummary {...props} />
    </CheckerProvider>
  );

  describe("renders in STTR Flow", () => {
    it("on LocationFinder (with all restrictions)", () => {
      render(
        <WrapperWithContext
          addressFromLocation={addressMock}
          isBelowInputFields
          showTitle
        />
      );

      // Expect to find:
      expect(screen.queryByText(monumentText)).toBeInTheDocument();

      expect(
        screen.queryByText(nationalCityScapeText, { exact: false })
      ).toBeInTheDocument(); // Beware: it should find the result: "has NATIONAL cityscape"

      // Expect NOT to find:
      expect(screen.queryByText(/wijzig/i)).not.toBeInTheDocument();

      expect(screen.queryByText("zoningplan")).not.toBeInTheDocument();
    });

    it("on LocationFinder (with selected restrictions)", () => {
      render(
        <WrapperWithContext
          addressFromLocation={addressMockNoMonument}
          isBelowInputFields
          showTitle
        />
      );

      // Expext to find:
      expect(
        screen.queryByText(municipalCityScapeText, { exact: false })
      ).toBeInTheDocument(); // Beware: it should find the result: "has MUNICIPAL cityscape"

      // Expect NOT to find:
      expect(screen.queryByText(noMonumentText)).not.toBeInTheDocument(); // Beware: it should NOT find the result: "no monument"

      expect(screen.queryByText(monumentText)).not.toBeInTheDocument(); // Beware: it should NOT find the result: "a monument"

      expect(screen.queryByText(/wijzig/i)).not.toBeInTheDocument();

      expect(screen.queryByText("zoningplan")).not.toBeInTheDocument();
    });

    it("on LocationFinder (without any restrictions)", () => {
      render(
        <WrapperWithContext
          addressFromLocation={addressMockNoRestrictions}
          isBelowInputFields
          showTitle
        />
      );

      // Expect NOT to find:
      expect(screen.queryByText(monumentText)).not.toBeInTheDocument();

      expect(screen.queryByText(noMonumentText)).not.toBeInTheDocument();

      expect(
        screen.queryByText("stads- of dorpsgezicht.", { exact: false })
      ).not.toBeInTheDocument();

      expect(screen.queryByText(/wijzig/i)).not.toBeInTheDocument();
    });

    it("above the questionnaire (with all restrictions)", () => {
      render(
        <WrapperWithContext
          addressFromLocation={addressMock}
          showEditLocationModal
        />
      );

      // Expext to find:
      expect(screen.queryByText(monumentText)).toBeInTheDocument();

      expect(
        screen.queryByText(nationalCityScapeText, { exact: false })
      ).toBeInTheDocument(); // Beware: it should find the result: "has NATIONAL cityscape"

      expect(screen.queryByText(/wijzig/i)).toBeInTheDocument();
    });

    it("above the questionnaire (with selected restrictions)", () => {
      render(
        <WrapperWithContext
          addressFromLocation={addressMockNoMonument}
          showEditLocationModal
        />
      );

      // Expext to find:
      expect(screen.queryByText(/wijzig/i)).toBeInTheDocument();

      expect(
        screen.queryByText(municipalCityScapeText, { exact: false })
      ).toBeInTheDocument(); // Beware: it should find the result: "has MUNICIPAL cityscape"

      // Expect NOT to find:
      expect(screen.queryByText(noMonumentText)).not.toBeInTheDocument(); // Beware: it should NOT find the result: "no monument"

      expect(screen.queryByText(monumentText)).not.toBeInTheDocument(); // Beware: it should NOT find the result: "a monument"

      expect(screen.queryByText(monumentText)).not.toBeInTheDocument(); // Beware: it should NOT find the result: "a monument"
    });

    it("above the questionnaire (without any restrictions)", () => {
      render(
        <WrapperWithContext
          addressFromLocation={addressMockNoRestrictions}
          showEditLocationModal
        />
      );

      // Expext to find:
      expect(screen.queryByText(/wijzig/i)).toBeInTheDocument();

      // Expect NOT to find:
      expect(screen.queryByText(monumentText)).not.toBeInTheDocument();

      expect(screen.queryByText(noMonumentText)).not.toBeInTheDocument();

      expect(
        screen.queryByText("stads- of dorpsgezicht.", { exact: false })
      ).not.toBeInTheDocument();
    });
  });

  /**
   *
   * OLO FLOW START HERE:
   *
   */

  describe("renders in OLO Flow", () => {
    it("renders in OLO Flow on LocationFinder (with all restrictions)", () => {
      render(
        <WrapperWithContext
          addressFromLocation={addressMock}
          isBelowInputFields
          showTitle
        />
      );

      // Expext to find:
      expect(screen.queryByText(monumentText)).toBeInTheDocument();

      expect(
        screen.queryByText(nationalCityScapeText, { exact: false })
      ).toBeInTheDocument(); // Beware: it should find the result: "has NATIONAL cityscape"

      // Expect NOT to find:
      expect(screen.queryByText(/wijzig/i)).not.toBeInTheDocument();
    });

    // @TODO: Fix this test. It test fails because `test-utils` is mocking `pathname: "/dakkapel-plaatsen"`, which is the IMTR Flow
    xit("renders in OLO Flow on LocationFinder (without any restrictions)", () => {
      render(
        <WrapperWithContext
          addressFromLocation={addressMockNoRestrictions}
          isBelowInputFields
          showTitle
        />
      );

      // Expect to find:
      expect(screen.queryByText(noMonumentText)).toBeInTheDocument(); // Beware: it should find the result: "no monument"

      expect(
        screen.queryByText(noCityScapeText, { exact: false })
      ).toBeInTheDocument(); // Beware: it should find the result: "no cityscape"

      // Expect NOT to find:
      expect(screen.queryByText(/wijzig/i)).not.toBeInTheDocument();
    });

    it("renders in OLO Flow on the Results Page (with all restrictions)", () => {
      render(
        <WrapperWithContext addressFromLocation={addressMock} showTitle />
      );

      // Expext to find:
      expect(screen.queryByText(monumentText)).toBeInTheDocument();

      expect(
        screen.queryByText(nationalCityScapeText, { exact: false })
      ).toBeInTheDocument(); // Beware: it should find the result: "has NATIONAL cityscape"

      // Expect NOT to find:
      expect(screen.queryByText(/wijzig/i)).not.toBeInTheDocument();
    });

    // @TODO: Fix this test. It test fails because `test-utils` is mocking `pathname: "/dakkapel-plaatsen"`, which is the IMTR Flow
    xit("renders in OLO Flow on the Results Page (without any restrictions)", () => {
      render(
        <WrapperWithContext
          addressFromLocation={addressMockNoRestrictions}
          showTitle
        />
      );

      expect(screen.queryByText(noMonumentText)).toBeInTheDocument(); // Beware: it should find the result: "no monument"

      expect(
        screen.queryByText(noCityScapeText, { exact: false })
      ).toBeInTheDocument(); // Beware: it should find the result: "no cityscape"

      // Expect NOT to find:
      expect(screen.queryByText(/wijzig/i)).not.toBeInTheDocument();

      expect(screen.queryByText(monumentText)).not.toBeInTheDocument();
    });

    it("renders in OLO Flow on the Results Page (without any zoningplans)", () => {
      render(
        <WrapperWithContext
          addressFromLocation={addressMockNoZoningplans}
          showTitle
        />
      );
    });
  });
});
