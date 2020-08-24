import React from "react";

import PhoneNumber from "./PhoneNumber";

type Props = {
  link?: boolean;
  eventName?: string;
};

export default ({ link = true, eventName }: Props) => (
  <>
    Bel dan de gemeente op <PhoneNumber {...{ link, eventName }} />, maandag tot
    en met vrijdag van 08.00 uur tot 18.00 uur.
  </>
);
