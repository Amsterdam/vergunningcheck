import React from "react";

import PhoneNumber from "./PhoneNumber";

type Props = {
  eventName: string;
  link?: boolean;
  openingSentence?: string;
};

export default ({
  eventName,
  link = true,
  openingSentence = "Bel in een van deze situaties de gemeente op", // This is the text before the phonenumber `14 020`
}: Props) => (
  <>
    {openingSentence} <PhoneNumber {...{ eventName, link }} />, maandag tot en
    met vrijdag van 08.00 uur tot 18.00 uur.
  </>
);
