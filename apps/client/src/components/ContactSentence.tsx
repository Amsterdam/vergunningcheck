import { Paragraph } from "@datapunt/asc-ui";
import React, { ReactElement } from "react";

import PhoneNumber from "./PhoneNumber";

type Props = {
  contact?: boolean;
  eventName?: string;
  inline?: boolean;
  link?: boolean;
  openingSentence?: string;
};

type WithParagraphProps = {
  inline: boolean;
  children: ReactElement<any>;
};

const WithParagraph = ({ inline, children }: WithParagraphProps) =>
  !inline ? <Paragraph>{children}</Paragraph> : children;

export default ({
  link = true,
  eventName,
  inline = false,
  openingSentence = "Bel in een van deze situaties",
}: Props) => (
  <WithParagraph inline={inline}>
    <>
      {openingSentence} de gemeente op <PhoneNumber {...{ link, eventName }} />,
      maandag tot en met vrijdag van 08.00 uur tot 18.00 uur.
    </>
  </WithParagraph>
);
