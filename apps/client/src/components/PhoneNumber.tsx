import { useMatomo } from "@datapunt/matomo-tracker-react";
import React from "react";
import styled from "styled-components";

import { actions, categories, trackingEnabled } from "../config/matomo";
import Link from "./Link";

const Wrapper = styled.span`
  white-space: nowrap;
`;

export type Props = {
  eventName?: string;
  href: string;
  link: boolean;
  text: string;
  variant?: string;
};

export default ({
  eventName,
  href = "tel:14020",
  link = true,
  text = "14 020",
  variant,
  ...otherProps
}: Props) => {
  const { trackEvent } = useMatomo();
  const onClick = trackingEnabled()
    ? () => {
        trackEvent({
          category: categories.navigate,
          action: actions.clickPhoneLink,
          name: `Telefoonnummer${eventName ? ` - ${eventName}` : ""}`,
        });
      }
    : undefined;

  return (
    <Wrapper>
      {link ? (
        <Link {...{ href, onClick, variant, ...otherProps }}>{text}</Link>
      ) : (
        text
      )}
    </Wrapper>
  );
};
