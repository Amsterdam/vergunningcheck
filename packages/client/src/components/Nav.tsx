import { ChevronLeft } from "@amsterdam/asc-assets";
import React, { FormEvent, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { PrevButton } from "../atoms";
import { NEXT_BUTTON } from "../utils/test-ids";
import { IconContainer, IconLeft, NavStyle, NextButton } from "./NavStyle";

export type NavProps = {
  formEnds?: boolean;
  nextText?: string;
  noMarginBottom?: boolean;
  onGoToNext?: (event: FormEvent) => void;
  onGoToPrev?: (event: FormEvent) => void;
  prevText?: string;
  showNext?: boolean;
  showPrev?: boolean;
};

const Nav: FunctionComponent<NavProps> = ({
  formEnds,
  nextText,
  noMarginBottom,
  onGoToNext,
  onGoToPrev,
  prevText,
  showNext,
  showPrev,
}) => {
  const { t } = useTranslation();
  return (
    <NavStyle noMarginBottom={noMarginBottom}>
      {showNext && (
        <NextButton
          data-testid={NEXT_BUTTON}
          formEnds={formEnds}
          onClick={onGoToNext}
          taskflow={!formEnds}
        >
          {nextText || t("common.next")}
        </NextButton>
      )}
      {showPrev && (
        <PrevButton onClick={onGoToPrev}>
          <IconContainer>
            <IconLeft size={14}>
              <ChevronLeft />
            </IconLeft>{" "}
            {prevText || t("common.previous")}
          </IconContainer>
        </PrevButton>
      )}
    </NavStyle>
  );
};

export default Nav;
