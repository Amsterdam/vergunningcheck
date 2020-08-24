import React from "react";

import PhoneNumber from "./PhoneNumber";

type Props = {
  contact?: boolean;
  link?: boolean;
  eventName?: string;
};

export default ({ contact = false, link = true, eventName }: Props) => (
  <>
    Bel {contact ? "dan" : "in een van deze situaties"} de gemeente op{" "}
    <PhoneNumber {...{ link, eventName }} />, maandag tot en met vrijdag van
    08.00 uur tot 18.00 uur.
  </>
);
