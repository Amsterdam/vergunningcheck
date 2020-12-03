import { useLocation } from "react-router-dom";

import { getSlugFromPathname } from "../utils";

export default (): string => {
  const { pathname } = useLocation();
  const slug = getSlugFromPathname(pathname);

  return slug;
};
