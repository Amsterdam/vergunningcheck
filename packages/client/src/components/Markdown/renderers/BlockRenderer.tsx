import React, { ReactChildren } from "react";

import { StyledParagraph } from "./BlockRendererStyles";

type Props = {
  children: ReactChildren;
};

/**
 * In case a 'paragraph' (markdown-block) contains 1 child which is an image (<Visual>),
 * we want to render the visual without wrapping it in a Paragraph as it's invalid
 * to wrap a figure-tag with a p-tag.
 */

export default ({ children }: Props) => {
  const useParagraphStyling =
    Array.isArray(children) && children[0]?.key.indexOf("image") === -1;
  return useParagraphStyling ? (
    <StyledParagraph>{children}</StyledParagraph>
  ) : (
    <>{children}</>
  );
};
