import React from "react";
import styled from "styled-components";

import { actions, eventNames } from "../config/matomo";
import Link from "./Link";

const Wrapper = styled.span`
  white-space: nowrap;
`;

export type Props = {
  darkBackground?: boolean;
  eventLocation: string;
  href?: string;
  link?: boolean;
  text?: string;
  variant?: string | null;
};

export default ({
  darkBackground = false,
  eventLocation,
  href = "tel:14020",
  link = true,
  text = "14 020",
  variant = "inline",
}: Props) => (
  <Wrapper>
    {link ? (
      <Link
        action={actions.CLICK_PHONE_LINK}
        eventName={`${eventNames.PHONE_NUMBER} - ${eventLocation}`}
        {...{
          darkBackground,
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
