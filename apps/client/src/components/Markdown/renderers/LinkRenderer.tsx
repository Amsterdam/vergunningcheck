import React from "react";

import { actions, eventNames } from "../../../config/matomo";
import Link from "../../Link";

type ChildrenProps = {
  props?: object;
};

type LinkRendererProps = {
  children: Array<ChildrenProps>;
  eventLocation: string;
  href: string;
};

const LinkRenderer: React.FC<LinkRendererProps> = ({
  children,
  eventLocation,
  href,
}) => {
  // Check if the link is using telephone protocol
  const url = new URL(href);
  const isPhoneLink = url.protocol === "tel:";

  // Pass the text in link (eg: <a>text in link</a>) or `TEXT_LINK` as fallback
  const { value = eventNames.TEXT_LINK } = children[0]?.props;

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

export default LinkRenderer;
