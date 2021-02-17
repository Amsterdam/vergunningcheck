import React from "react";
import styled from "styled-components";

import { actions } from "../config/matomo";
import { PHONE_NUMBER } from "../utils/test-ids";
import Link, { LinkProps } from "./Link";

const Wrapper = styled.span`
  white-space: nowrap;
`;

export default ({
  href = "tel:14020",
  link = true,
  text = "14 020",
  variant = "inline",
  ...linkProps
}: LinkProps) => (
  <Wrapper data-testid={PHONE_NUMBER}>
    {link ? (
      <Link
        action={actions.CLICK_PHONE_LINK}
        {...{
          href,
          variant,
          ...linkProps,
        }}
      >
        {text}
      </Link>
    ) : (
      text
    )}
  </Wrapper>
);
