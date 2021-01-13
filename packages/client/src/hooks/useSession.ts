import { useContext } from "react";

import { SessionContext } from "../SessionContext";

export default () => {
  const { session, setSession } = useContext(SessionContext);
  return { session, setSession };
};
