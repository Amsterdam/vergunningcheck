import React, { FunctionComponent } from "react";
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

/**
 * Replacers are used to change the incoming tekst.
 * The output of every preprocessor is passed as input to the next.
 */
const replacers = [
  // Replace phone number with Link
  (str: string) => str.replace(/ 14\s?020/g, " [14 020](tel:14020)"),
];

const Markdown: FunctionComponent<MarkDownProps> = ({
  eventLocation,
  source,
}) => (
  <ReactMarkdown
    source={replacers.reduce((acc, reducer) => reducer(acc), source)}
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
