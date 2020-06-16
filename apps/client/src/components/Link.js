import React, { useContext } from "react";
import { Link as StyledComponentLink } from "@datapunt/asc-ui";
import PropTypes from "prop-types";
import { useMatomo } from "@datapunt/matomo-tracker-react";
import { actions, categories } from "../utils/MatamoConfig";
import Context from "../context";

const Link = ({
  children,
  category = categories["navigate"],
  action = actions["clickExternalLink"],
  eventName,
  href,
  ...rest
}) => {
  const { trackEvent } = useMatomo();
  const { topic } = useContext(Context);

  // The default category is navigate, it can be overwritten with the prop category.
  // The default action is clickExternalLink, it can be overwritten. The name in action is the topic name
  // There should always be a event name.
  const onClick = () => {
    trackEvent({
      category,
      action: `${action} ${topic.slug || "home"}`,
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
  href: PropTypes.string,
  internal: PropTypes.bool,
};

export default Link;
