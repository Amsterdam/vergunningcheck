import { ChevronLeft } from "@datapunt/asc-assets";
import React from "react";

import { PrevButton } from "../atoms";
import { NEXT_BUTTON } from "../utils/test-ids";
import { IconContainer, IconLeft, NavStyle, NextButton } from "./NavStyle";

export type NavProps = {
  formEnds?: boolean;
  nextText?: string;
  noMarginBottom?: boolean;
  onGoToNext?: (event: React.FormEvent) => void;
  onGoToPrev?: (event: React.FormEvent) => void;
  prevText?: string;
  showNext?: boolean;
  showPrev?: boolean;
};

const Nav: React.FC<NavProps> = ({
  formEnds,
  nextText = "Volgende",
  noMarginBottom,
  onGoToNext,
  onGoToPrev,
  prevText = "Vorige",
  showNext,
  showPrev,
}) => {
  return (
    <NavStyle noMarginBottom={noMarginBottom}>
      {showNext && (
        <NextButton
          data-testid={NEXT_BUTTON}
          formEnds
          onClick={onGoToNext}
          taskflow={!formEnds}
          type="submit"
          variant="secondary"
        >
          {nextText}
        </NextButton>
      )}
      {showPrev && (
        <PrevButton onClick={onGoToPrev}>
          <IconContainer>
            <IconLeft size={14}>
              <ChevronLeft />
            </IconLeft>{" "}
            {prevText}
          </IconContainer>
        </PrevButton>
      )}
    </NavStyle>
  );
};

export default Nav;
