import React from "react";

import { actions } from "../../../config/matomo";
import Link from "../../Link";

type Props = {
  eventLocation: string;
  href: string;
  linkText: string;
};

const LinkRenderer: React.FC<Props> = ({
  children,
  eventLocation,
  href,
  linkText,
}) => {
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
  const action = isPhoneLink
    ? actions.CLICK_PHONE_LINK
    : actions.CLICK_EXTERNAL_NAVIGATION;
  const eventName = isPhoneLink
    ? eventLocation
    : `${linkText} - ${eventLocation}`;

  return (
    <Link variant="inline" {...{ action, eventName, href, rel, target }}>
      {children}
    </Link>
  );
};

export default LinkRenderer;
