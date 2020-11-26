import { useLocation } from "react-router-dom";

import { getSlugFromPathname } from "../utils";

export default (): string => {
  const { pathname } = useLocation();
  const slug = getSlugFromPathname(pathname);
  if (!slug && pathname !== "/") {
    throw new Error(`useSlug: slug not found (${pathname})`);
  }
  return slug;
};
