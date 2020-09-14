import { ChevronLeft } from "@datapunt/asc-assets";
import { Button } from "@datapunt/asc-ui";
import PropTypes from "prop-types";
import React from "react";

import { PrevButton } from "../atoms";
import { NEXT_BUTTON } from "../utils/test-ids";
import { IconContainer, IconLeft, NavStyle } from "./NavStyle";

const Nav = ({
  formEnds,
  nextText,
  noMarginBottom,
  onGoToNext,
  onGoToPrev,
  prevText,
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

Nav.defaultProps = {
  formEnds: false,
  nextText: "Volgende",
  noMarginBottom: false,
  page: "undefined-page",
  prevText: "Vorige",
};

Nav.propTypes = {
  formEnds: PropTypes.bool,
  nextText: PropTypes.string,
  noMarginBottom: PropTypes.bool,
  onGoToNext: PropTypes.func,
  onGoToPrev: PropTypes.func,
  page: PropTypes.string,
  prevText: PropTypes.string,
  showNext: PropTypes.bool,
  showPrev: PropTypes.bool,
  style: PropTypes.object,
};

export default Nav;
