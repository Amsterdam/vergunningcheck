import React from "react";

import { render, screen } from "../../utils/test-utils";
import MarkDown from "./";

jest.mock("react-router-dom", () => ({
  useParams: () => ({ slug: "dakraam-plaatsen" }),
}));

const image =
  '![](https://sttr-files.flolegal.app/00000001002564440000/3_a_Voorkant_v2.png "caption")';

const linkMock =
  "https://www.amsterdam.nl/kunst-cultuur/monumenten/wet-regelgeving/beschermde-stads/";
const textWithLink = `text with [link](${linkMock}).`;

const listMock = "list:\n\n*   item 1\n*   item 2";

describe("MarkDown", () => {
  it("renders text", () => {
    render(<MarkDown eventLocation="eventLocation" source="source" />);

    const source = screen.queryByText("source") as HTMLElement;
    expect(source).toBeInTheDocument();
  });

  it("renders images", () => {
    render(<MarkDown eventLocation="eventLocation" source={image} />);

    const source = screen.queryByText("caption") as HTMLElement;
    expect(source).toBeInTheDocument();
  });

  it("renders normal links", () => {
    render(<MarkDown eventLocation="eventLocation" source={textWithLink} />);

    const source = screen.queryByText("text with", {
      exact: false,
    }) as HTMLElement;
    expect(source).toBeInTheDocument();

    const anchor = screen.queryByText("link") as HTMLElement;
    expect(anchor).toBeInTheDocument();
    expect(anchor).toHaveAttribute("href", linkMock);
  });

  it("renders telephone links", () => {
    render(
      <MarkDown eventLocation="eventLocation" source="[14 020](tel:14020)" />
    );

    const anchor = screen.queryByText("14 020") as HTMLElement;
    expect(anchor).toBeInTheDocument();
    expect(anchor).toHaveAttribute("href", "tel:14020");
  });

  it("shouldn't render empty links", () => {
    render(
      <MarkDown
        eventLocation="eventLocation"
        source="first [](https://nothing) last"
      />
    );

    const source = screen.queryByText("first last") as HTMLElement;
    expect(source).toBeInTheDocument();
  });

  it("renders a list", () => {
    const { container } = render(
      <MarkDown eventLocation="eventLocation" source={listMock} />
    );

    expect(container.querySelector("p")).toBeInTheDocument();
    expect(container.querySelector("p")).toHaveTextContent("list:");

    expect(container.querySelector("ul")).toBeInTheDocument();

    const items = container.querySelectorAll("li") as any;
    expect(items[0]).toBeInTheDocument();
    expect(items[0]).toHaveTextContent("item 1");
    expect(items[1]).toBeInTheDocument();
    expect(items[1]).toHaveTextContent("item 2");
  });
});
