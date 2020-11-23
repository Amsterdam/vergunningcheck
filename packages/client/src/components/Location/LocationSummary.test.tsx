import React from "react";

import addressMock from "../../__mocks__/addressMock";
import addressMockNoMonument from "../../__mocks__/addressMockNoMonument";
import addressMockNoRestrictions from "../../__mocks__/addressMockNoRestrictions";
import addressMockNoZoningplans from "../../__mocks__/addressMockNoZoningplans";
import { CheckerProvider } from "../../CheckerContext";
import { render, screen } from "../../utils/test-utils";
import LocationSummary from "./LocationSummary";

describe("LocationSummary", () => {
  const WrapperWithContext = (
    props: React.ComponentProps<typeof LocationSummary>
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
      expect(
        screen.queryByText("Het gebouw is een monument.")
      ).toBeInTheDocument();

      expect(
        screen.queryByText(
          "Het gebouw ligt in een rijksbeschermd stads- of dorpsgezicht.",
          { exact: false }
        )
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
        screen.queryByText(
          "Het gebouw ligt in een gemeentelijk beschermd stads- of dorpsgezicht.",
          { exact: false }
        )
      ).toBeInTheDocument(); // Beware: it should find the result: "has MUNICIPAL cityscape"

      // Expect NOT to find:
      expect(
        screen.queryByText("Het gebouw is geen monument.")
      ).not.toBeInTheDocument(); // Beware: it should NOT find the result: "no monument"

      expect(
        screen.queryByText("Het gebouw is een monument.")
      ).not.toBeInTheDocument(); // Beware: it should NOT find the result: "a monument"

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
      expect(
        screen.queryByText("Het gebouw is een monument.")
      ).not.toBeInTheDocument();

      expect(
        screen.queryByText("Het gebouw is geen monument.")
      ).not.toBeInTheDocument();

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
      expect(
        screen.queryByText("Het gebouw is een monument.")
      ).toBeInTheDocument();

      expect(
        screen.queryByText(
          "Het gebouw ligt in een rijksbeschermd stads- of dorpsgezicht.",
          { exact: false }
        )
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
        screen.queryByText(
          "Het gebouw ligt in een gemeentelijk beschermd stads- of dorpsgezicht.",
          { exact: false }
        )
      ).toBeInTheDocument(); // Beware: it should find the result: "has MUNICIPAL cityscape"

      // Expect NOT to find:
      expect(
        screen.queryByText("Het gebouw is geen monument.")
      ).not.toBeInTheDocument(); // Beware: it should NOT find the result: "no monument"

      expect(
        screen.queryByText("Het gebouw is een monument.")
      ).not.toBeInTheDocument(); // Beware: it should NOT find the result: "a monument"

      expect(
        screen.queryByText("Het gebouw is een monument.")
      ).not.toBeInTheDocument(); // Beware: it should NOT find the result: "a monument"
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
      expect(
        screen.queryByText("Het gebouw is een monument.")
      ).not.toBeInTheDocument();

      expect(
        screen.queryByText("Het gebouw is geen monument.")
      ).not.toBeInTheDocument();

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
      expect(
        screen.queryByText("Het gebouw is een monument.")
      ).toBeInTheDocument();

      expect(
        screen.queryByText(
          "Het gebouw ligt in een rijksbeschermd stads- of dorpsgezicht.",
          { exact: false }
        )
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
      expect(
        screen.queryByText("Het gebouw is geen monument.")
      ).toBeInTheDocument(); // Beware: it should find the result: "no monument"

      expect(
        screen.queryByText(
          "Het gebouw ligt niet in een beschermd stads- of dorpsgezicht.",
          { exact: false }
        )
      ).toBeInTheDocument(); // Beware: it should find the result: "no cityscape"

      // Expect NOT to find:
      expect(screen.queryByText(/wijzig/i)).not.toBeInTheDocument();
    });

    it("renders in OLO Flow on the Results Page (with all restrictions)", () => {
      render(
        <WrapperWithContext addressFromLocation={addressMock} showTitle />
      );

      // Expext to find:
      expect(
        screen.queryByText("Het gebouw is een monument.")
      ).toBeInTheDocument();

      expect(
        screen.queryByText(
          "Het gebouw ligt in een rijksbeschermd stads- of dorpsgezicht.",
          { exact: false }
        )
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

      expect(
        screen.queryByText("Het gebouw is geen monument.")
      ).toBeInTheDocument(); // Beware: it should find the result: "no monument"

      expect(
        screen.queryByText(
          "Het gebouw ligt niet in een beschermd stads- of dorpsgezicht.",
          { exact: false }
        )
      ).toBeInTheDocument(); // Beware: it should find the result: "no cityscape"

      // Expect NOT to find:
      expect(screen.queryByText(/wijzig/i)).not.toBeInTheDocument();

      expect(
        screen.queryByText("Het gebouw is een monument.")
      ).not.toBeInTheDocument();
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
