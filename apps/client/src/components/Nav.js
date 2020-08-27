import { ChevronLeft } from "@datapunt/asc-assets";
import { Button } from "@datapunt/asc-ui";
import PropTypes from "prop-types";
import React from "react";

import { NEXT_BUTTON, PREV_BUTTON } from "../utils/test-ids";
import { IconContainer, IconLeft, NavStyle } from "./NavStyle";

const Nav = ({
  formEnds,
  nextText,
  onGoToNext,
  onGoToPrev,
  prevText,
  showNext,
  showPrev,
  style,
}) => {
  return (
    <NavStyle {...{ style }}>
      <div>
        {showNext && (
          <Button
            type="submit"
            variant="secondary"
            onClick={onGoToNext}
            taskflow={!formEnds}
            style={{ marginRight: formEnds ? 10 : 25 }}
            data-testid={NEXT_BUTTON}
          >
            {nextText}
          </Button>
        )}
      </div>
      <div>
        {showPrev && (
          <Button
            data-testid={PREV_BUTTON}
            onClick={onGoToPrev}
            type="button"
            style={{ marginLeft: 10 }}
            variant="textButton"
          >
            <IconContainer>
              <IconLeft size={14}>
                <ChevronLeft />
              </IconLeft>{" "}
              {prevText}
            </IconContainer>
          </Button>
        )}
      </div>
    </NavStyle>
  );
};

Nav.defaultProps = {
  formEnds: false,
  nextText: "Volgende",
  page: "undefined-page",
  prevText: "Vorige",
};

Nav.propTypes = {
  formEnds: PropTypes.bool,
  nextText: PropTypes.string,
  onGoToNext: PropTypes.func,
  onGoToPrev: PropTypes.func,
  page: PropTypes.string,
  prevText: PropTypes.string,
  showNext: PropTypes.bool,
  showPrev: PropTypes.bool,
  style: PropTypes.object,
};

export default Nav;
