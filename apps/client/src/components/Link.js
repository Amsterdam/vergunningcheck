import { Link as StyledComponentLink } from "@datapunt/asc-ui";
import PropTypes from "prop-types";
import React from "react";

import { actions, categories } from "../config/matomo";
import withTracking from "../hoc/withTracking";

const Link = ({
  children,
  category = categories.navigate,
  action = actions.clickExternalLink,
  eventName,
  matomoTrackEvent,
  href,
  ...rest
}) => {
  // The default category is navigate, it can be overwritten with the prop category.
  // The default action is clickExternalLink, it can be overwritten.
  // There should always be an eventName.

  const onClick = () =>
    matomoTrackEvent({
      category,
      action,
      name: eventName,
    });

  return (
    <StyledComponentLink href={href} onClick={href && onClick} {...rest}>
      {children}
    </StyledComponentLink>
  );
};

Link.propTypes = {
  eventName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  category: PropTypes.string,
  matomoTrackEvent: PropTypes.func,
  action: PropTypes.string,
  href: PropTypes.string,
  internal: PropTypes.bool,
};

export default withTracking(Link);
