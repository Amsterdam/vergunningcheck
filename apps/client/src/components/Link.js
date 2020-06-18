import React from "react";
import { Link as StyledComponentLink } from "@datapunt/asc-ui";
import PropTypes from "prop-types";
import { actions, categories } from "../MatamoConfig";
import withTracking from "../hoc/withTracking";

const Link = ({
  children,
  category = categories.navigate,
  action = actions.clickExternalLink,
  eventName,
  ClickTrackEvent,
  href,
  ...rest
}) => {
  // The default category is navigate, it can be overwritten with the prop category.
  // The default action is clickExternalLink, it can be overwritten. The name in action is the topic name
  // There should always be a event name.
  const onClick = () => {
    ClickTrackEvent({
      category,
      action,
      name: eventName,
    });
    window.location.href = href;
  };

  return (
    <StyledComponentLink onClick={href && onClick} {...rest}>
      {children}
    </StyledComponentLink>
  );
};

Link.propTypes = {
  eventName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  category: PropTypes.string,
  action: PropTypes.string,
  href: PropTypes.string,
  internal: PropTypes.bool,
};

export default withTracking(Link);
