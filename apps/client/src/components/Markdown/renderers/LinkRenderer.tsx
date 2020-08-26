import React from "react";

import { actions } from "../../../config/matomo";
import Link from "../../Link";

type Props = {
  href: string;
};

const LinkRenderer: React.FC<Props> = ({ children, href }) => {
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
  const eventName = `Markdown${isPhoneLink ? " - Telefoonnummer" : ""}`;
  const action = isPhoneLink
    ? actions.CLICK_PHONE_LINK
    : actions.CLICK_EXTERNAL_NAVIGATION;

  return (
    <Link variant="inline" {...{ href, target, rel, eventName, action }}>
      {children}
    </Link>
  );
};

export default LinkRenderer;
