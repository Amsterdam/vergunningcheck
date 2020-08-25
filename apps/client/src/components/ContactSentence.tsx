import { Paragraph } from "@datapunt/asc-ui";
import React, { ReactElement } from "react";

import PhoneNumber from "./PhoneNumber";

type Props = {
  eventName?: string;
  inline?: boolean;
  link?: boolean;
  openingSentence?: string;
};

type WithParagraphProps = {
  children: ReactElement;
  inline: boolean;
};

const WithParagraph = ({ children, inline }: WithParagraphProps) =>
  !inline ? <Paragraph>{children}</Paragraph> : children;

export default ({
  eventName,
  inline = false,
  link = true,
  openingSentence = "Bel in een van deze situaties",
}: Props) => (
  <WithParagraph inline={inline}>
    <>
      {openingSentence} de gemeente op <PhoneNumber {...{ link, eventName }} />,
      maandag tot en met vrijdag van 08.00 uur tot 18.00 uur.
    </>
  </WithParagraph>
);
