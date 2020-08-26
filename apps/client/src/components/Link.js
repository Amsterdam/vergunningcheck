import { Link as StyledComponentLink } from "@datapunt/asc-ui";
import PropTypes from "prop-types";
import React, { useContext } from "react";

import { actions } from "../config/matomo";
import { CheckerContext } from "../context";
import withTracking from "../hoc/withTracking";

const Link = ({
  action = actions.CLICK_EXTERNAL_NAVIGATION,
  children,
  href,
  matomoTrackEvent,
  ...rest
}) => {
  const checkerContext = useContext(CheckerContext);

  // The default category is intro, it is not required, it can be overwritten.
  // The default action is CLICK_EXTERNAL_LINK, it can be overwritten.
  const onClick = () =>
    matomoTrackEvent({
      category: checkerContext?.topic?.category,
      action,
      name: children.toLowerCase(),
    });

  return (
    <StyledComponentLink href={href} onClick={href && onClick} {...rest}>
      {children}
    </StyledComponentLink>
  );
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  category: PropTypes.string,
  matomoTrackEvent: PropTypes.func,
  action: PropTypes.string,
  href: PropTypes.string,
  internal: PropTypes.bool,
};

export default withTracking(Link);
