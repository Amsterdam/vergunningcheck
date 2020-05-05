import React from "react";

/**
 * This component makes sure links always have a _blank target.
 * Because of target="_blank" we also need to set the rel-attribute, see
 * https://mathiasbynens.github.io/rel-noopener/ for more details
 **/
export default ({ children, ...rest }) => {
  const props = Object.assign({}, rest, {
    target: "_blank",
    rel: "noopener noreferrer",
  });
  return <a {...props}>{children}</a>;
};
