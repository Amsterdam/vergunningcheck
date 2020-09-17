import { ChevronLeft } from "@datapunt/asc-assets";
import { Button } from "@datapunt/asc-ui";
import React from "react";

import { PrevButton } from "../atoms";
import { NEXT_BUTTON } from "../utils/test-ids";
import { IconContainer, IconLeft, NavStyle } from "./NavStyle";

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
        <Button
          data-testid={NEXT_BUTTON}
          onClick={onGoToNext}
          style={{ marginRight: formEnds ? 10 : 25 }}
          taskflow={!formEnds}
          type="submit"
          variant="secondary"
        >
          {nextText}
        </Button>
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
