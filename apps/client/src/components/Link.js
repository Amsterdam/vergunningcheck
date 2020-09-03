import { Link as StyledComponentLink } from "@datapunt/asc-ui";
import PropTypes from "prop-types";
import React, { useContext } from "react";

import { actions } from "../config/matomo";
import { CheckerContext } from "../context";
import withTracking from "../hoc/withTracking";

const Link = ({
  action = actions.CLICK_EXTERNAL_NAVIGATION,
  children,
  eventName,
  href,
  matomoTrackEvent,
  ...rest
}) => {
  const checkerContext = useContext(CheckerContext);

  // The default action is CLICK_EXTERNAL_NAVIGATION, it can be overwritten.
  const onClick = () => {
    if (eventName && checkerContext.topic.name) {
      matomoTrackEvent({
        action,
        category: checkerContext.topic.name,
        name: eventName,
      });
    }
  };

  return (
    <StyledComponentLink href={href} onClick={href && onClick} {...rest}>
      {children}
    </StyledComponentLink>
  );
};

Link.propTypes = {
  action: PropTypes.string,
  children: PropTypes.node.isRequired,
  category: PropTypes.string,
  href: PropTypes.string,
  eventName: PropTypes.string,
  internal: PropTypes.bool,
  matomoTrackEvent: PropTypes.func,
};

export default withTracking(Link);
