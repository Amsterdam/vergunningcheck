import React from "react";
import styled, { css } from "styled-components";

import { actions } from "../config/matomo";
import { PHONE_NUMBER } from "../utils/test-ids";
import Link from "./Link";

type WrapperProps = { underline?: boolean };

const Wrapper = styled.span<WrapperProps>`
  white-space: nowrap;

  ${({ underline }) =>
    underline &&
    css`
      text-decoration: underline;
    `}
`;

type Props = {
  darkBackground?: boolean;
  eventName: string;
  href?: string;
  link?: boolean;
  text?: string;
  variant?: string | null;
} & WrapperProps;

export default ({
  darkBackground = false,
  eventName,
  href = "tel:14020",
  link = true,
  text = "14 020",
  underline,
  variant = "inline",
}: Props) => (
  <Wrapper data-testid={PHONE_NUMBER} underline={underline}>
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
