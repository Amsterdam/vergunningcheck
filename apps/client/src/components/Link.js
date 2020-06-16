import React from "react";
import { Link } from "@datapunt/asc-ui";
import PropTypes from "prop-types";
import { useMatomo } from "@datapunt/matomo-tracker-react";
import { actions, categories } from "../TrackEventsConfig";

const TrackedLink = ({ children, name, href, ...rest }) => {
  const { trackEvent } = useMatomo();

  const onClick = () => {
    trackEvent({
      category: categories["navigate"],
      action: actions["clickExternalLink"],
      name,
    });
    window.location.href = href;
  };

  return (
    <Link onClick={onClick} {...rest}>
      {children}
    </Link>
  );
};

TrackedLink.propTypes = {
  name: PropTypes.string.isRequired,
};

export default TrackedLink;
