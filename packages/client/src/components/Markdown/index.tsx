import React from "react";
import ReactMarkdown from "react-markdown";

import { ListItem } from "../../atoms";
import Visual from "../Visual";
import BlockRenderer from "./renderers/BlockRenderer";
import LinkRenderer from "./renderers/LinkRenderer";
import ListRenderer from "./renderers/ListRenderer";

type MarkDownProps = {
  eventLocation: string;
  source: string;
};

const Markdown = ({ eventLocation, source }: MarkDownProps) => (
  <ReactMarkdown
    source={source}
    renderers={{
      image: Visual,
      link: (props) => <LinkRenderer {...{ eventLocation, ...props }} />,
      list: ListRenderer,
      listItem: ListItem,
      paragraph: BlockRenderer,
    }}
  />
);

export default Markdown;
