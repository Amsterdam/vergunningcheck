import React from "react";
import ReactMarkdown from "react-markdown";

import { ListItem } from "../../atoms";
import Visual from "../Visual";
import BlockRenderer from "./renderers/BlockRenderer";
import LinkRenderer from "./renderers/LinkRenderer";
import ListRenderer from "./renderers/ListRenderer";

export default ({ source }) => (
  <ReactMarkdown
    source={source}
    renderers={{
      paragraph: BlockRenderer,
      list: ListRenderer,
      listItem: ListItem,
      image: Visual,
      link: LinkRenderer,
    }}
  />
);
