import React from "react";

import { StyledParagraph } from "./BlockRendererStyles";

/**
 * In case a 'paragraph' (markdown-block) contains 1 child which is an image (<Visual>),
 * we want to render the visual without wrapping it in a Paragraph as it's invalid
 * to wrap a figure-tag with a p-tag.
 */
export default (props) => {
  const { children } = props;
  // Checking the key seems hacky, not sure if there is an easier way with ReactMarkdown
  const isImage = children[0]?.key.indexOf("image") === 0;
  return isImage ? children : <StyledParagraph>{children}</StyledParagraph>;
};
