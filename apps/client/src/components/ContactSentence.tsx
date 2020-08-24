import React from "react";

import PhoneNumber from "./PhoneNumber";

type Props = {
  eventName: string;
};

export default ({ eventName }: Props) => (
  <>
    Bel dan de gemeente op <PhoneNumber eventName={eventName} />, maandag tot en
    met vrijdag van 08.00 uur tot 18.00 uur.
  </>
);
