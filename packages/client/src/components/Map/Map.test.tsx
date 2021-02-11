import userEvent from "@testing-library/user-event";
import React from "react";

import graphTreeMock from "../../__mocks__/treesListMocks";
import { render, screen } from "../../utils/test-utils";
import LocationMap from "./Map";

beforeEach(() => {
  jest.clearAllMocks();
});

it("should render correctly", () => {
  render(<LocationMap />, {}, graphTreeMock);

  // @TODO fix with real text from translation
  const zoomWarningText = "Too few ordinates in GeoJSON";

  // should render zoom msg on initial render
  expect(screen.getByText(zoomWarningText)).toBeInTheDocument();

  // should render zoom controls
  const zoomInControl = screen.getByTitle(/Inzoomen/i);
  const zoomOutControl = screen.getByTitle(/Uitzoomen/i);

  expect(zoomInControl).toBeInTheDocument();
  expect(zoomOutControl).toBeInTheDocument();

  userEvent.click(zoomInControl);

  // zoom in
  userEvent.click(zoomInControl);
  userEvent.click(zoomInControl);
  userEvent.click(zoomInControl);
  userEvent.click(zoomInControl);
  userEvent.click(zoomInControl);
  userEvent.click(zoomInControl);

  // should not render zoom message
  expect(screen.queryByText(zoomWarningText)).not.toBeInTheDocument();

  // should render trees at this zoom level
});
