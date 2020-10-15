import React from "react";
import styled from "styled-components";

import { actions } from "../config/matomo";
import { PHONE_NUMBER } from "../utils/test-ids";
import Link from "./Link";

const Wrapper = styled.span`
  white-space: nowrap;
`;

export type Props = {
  darkBackground?: boolean;
  eventName: string;
  href?: string;
  link?: boolean;
  text?: string;
  variant?: string | null;
};

export default ({
  darkBackground = false,
  eventName,
  href = "tel:14020",
  link = true,
  text = "14 020",
  variant = "inline",
}: Props) => (
  <Wrapper data-testid={PHONE_NUMBER}>
    {link ? (
      <Link
        action={actions.CLICK_PHONE_LINK}
        {...{
          darkBackground,
          eventName,
          href,
          variant,
        }}
      >
        {text}
      </Link>
    ) : (
      text
    )}
  </Wrapper>
);