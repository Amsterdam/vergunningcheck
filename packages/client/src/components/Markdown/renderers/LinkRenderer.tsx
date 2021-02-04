import React, { ReactChildren } from "react";

import { actions } from "../../../config/matomo";
import Link from "../../Link";

type LinkRendererProps = {
  children: ReactChildren;
  eventLocation: string;
  href: string;
};

export default ({ children, eventLocation, href }: LinkRendererProps) => {
  const value = Array.isArray(children) && children[0]?.props?.value;

  // Don't return empty link
  if (!value) {
    return null;
  }

  // Check if the link is using telephone protocol
  const url = new URL(href);
  const isPhoneLink = url.protocol === "tel:";

  /**
   * If it's not a phone link make sure we open in new tab and
   * don't send our information to the new page.
   * https://mathiasbynens.github.io/rel-noopener/ for more details
   **/
  const target = isPhoneLink ? "_self" : "_blank";
  const rel = isPhoneLink ? "" : "noopener noreferrer";

  // Setup event props
  const action = isPhoneLink ? actions.CLICK_PHONE_LINK : undefined;
  const eventName = isPhoneLink ? eventLocation : `${value} - ${eventLocation}`;

  return (
    <Link variant="inline" {...{ action, eventName, href, rel, target }}>
      {children}
    </Link>
  );
};
