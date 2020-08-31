import React from "react";

import PhoneNumber from "./PhoneNumber";

type Props = {
  eventName: string;
  eventLocation?: string;
  link?: boolean;
  openingSentence?: string;
};

export default ({
  eventName,
  eventLocation,
  link = true,
  openingSentence = "Bel in een van deze situaties de gemeente op", // This is all the text before the number `14 020`
}: Props) => (
  <>
    {openingSentence} <PhoneNumber {...{ link, eventName, eventLocation }} />,
    maandag tot en met vrijdag van 08.00 uur tot 18.00 uur.
  </>
);
