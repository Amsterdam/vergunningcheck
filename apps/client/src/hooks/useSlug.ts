import { matchPath } from "react-router";
import { useLocation } from "react-router-dom";

export default (): string | undefined => {
  const location = useLocation();
  const match = matchPath(location.pathname, {
    path: "/:slug",
  }) as any;
  return match?.params?.slug;
};
