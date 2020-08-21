import { useMatomo } from "@datapunt/matomo-tracker-react";
import React from "react";
import styled from "styled-components";

import Anchor from "../atoms/Anchor";
import { actions, categories, trackingEnabled } from "../config/matomo";

const Wrapper = styled.span`
  white-space: nowrap;
`;

export type Props = {
  link: boolean;
  text: string;
  href: string;
  eventName?: string;
};

export default ({
  link = true,
  text = "14 020",
  href = "tel:14020",
  eventName,
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
      {link ? <Anchor {...{ href, onClick }}>{text}</Anchor> : text}
    </Wrapper>
  );
};
