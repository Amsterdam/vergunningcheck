import React from "react";
import ReactMarkdown from "react-markdown";

import { ListItem } from "../../atoms";
import { eventNames } from "../../config/matomo";
import Visual from "../Visual";
import BlockRenderer from "./renderers/BlockRenderer";
import LinkRenderer from "./renderers/LinkRenderer";
import ListRenderer from "./renderers/ListRenderer";

// Pass the exact link text from MarkDown (eg: <a>link text</a>) or pass `TEXT_LINK`
const linkRenderer = (eventLocation, props) => {
  let linkText = eventNames.TEXT_LINK;

  if (props.children.length) {
    const { value } = props.children[0].props;
    if (value) {
      linkText = value.toLowerCase();
    }
  }
  return <LinkRenderer {...{ eventLocation, linkText }} {...props} />;
};

export default ({ eventLocation, source }) => (
  <ReactMarkdown
    source={source}
    renderers={{
      paragraph: BlockRenderer,
      list: ListRenderer,
      listItem: ListItem,
      image: Visual,
      link: (props) => linkRenderer(eventLocation, props),
    }}
  />
);
