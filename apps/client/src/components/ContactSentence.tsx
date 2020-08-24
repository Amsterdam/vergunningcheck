import React from "react";

import PhoneNumber, { Props } from "./PhoneNumber";

export default (props: Props) => (
  <>
    Bel dan de gemeente op <PhoneNumber {...props} />, maandag tot en met
    vrijdag van 08.00 uur tot 18.00 uur.
  </>
);
