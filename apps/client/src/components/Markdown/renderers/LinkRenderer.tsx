import { useMatomo } from "@datapunt/matomo-tracker-react";
import React from "react";

import Anchor from "../../../atoms/Anchor";
import { actions, categories, trackingEnabled } from "../../../config/matomo";

type Props = {
  href: string;
  onClick: React.MouseEventHandler;
};

/**
 * This component makes sure links always have a _blank target.
 * Because of target="_blank" we also need to set the rel-attribute, see
 * https://mathiasbynens.github.io/rel-noopener/ for more details
 **/

const LinkRenderer: React.FC<Props> = ({ children, onClick, ...rest }) => {
  // const X: React.FC<Props> = ({ children, onClick, ...rest }) => {
  const { trackEvent } = useMatomo();

  const url = new URL(rest.href);
  const isPhoneLink = url.protocol === "tel:";

  // If it's not a phone link make sure we open in new tab and
  // don't send our information to the new page.
  const props = isPhoneLink
    ? rest
    : Object.assign({}, rest, {
        target: "_blank",
        rel: "noopener noreferrer",
      });

  const onClickWithTracking = trackingEnabled()
    ? (event: React.MouseEvent) => {
        const action =
          url.protocol === "tel:"
            ? actions.clickPhoneLink
            : actions.clickExternalLink;
        trackEvent({
          category: categories.navigate,
          action,
          name: `Markdown${isPhoneLink ? " - Telefoonnummer" : ""}`,
        });
        onClick && onClick(event);
      }
    : undefined;

  return (
    <Anchor {...{ ...props, onClick: onClickWithTracking }}>{children}</Anchor>
  );
};

export default LinkRenderer;
