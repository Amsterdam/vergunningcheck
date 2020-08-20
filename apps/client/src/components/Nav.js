import { ChevronLeft } from "@datapunt/asc-assets";
import { Button } from "@datapunt/asc-ui";
import { useMatomo } from "@datapunt/matomo-tracker-react";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { useRouteMatch } from "react-router-dom";

import { CheckerContext } from "../context";
import { getslug, routeConfig } from "../routes";
import { NEXT_BUTTON, PREV_BUTTON } from "../utils/test-ids";
import { IconContainer, IconLeft, NavStyle } from "./NavStyle";

const Nav = ({
  prevText,
  showPrev,
  onGoToPrev,
  onGoToNext,
  showNext,
  nextText,
  formEnds,
}) => {
  const {
    topic: { slug: name },
  } = useContext(CheckerContext);
  const { trackEvent } = useMatomo();
  const { path } = useRouteMatch();
  const route = routeConfig.find((route) => route.path === path);
  const category = route.matomoPage || route.name;

  const handleNextClick = (e) => {
    const action = formEnds
      ? getslug(nextText.toLowerCase())
      : "form-volgende-knop";

    trackEvent({
      category,
      action,
      name,
    });

    if (onGoToNext) onGoToNext(e);
  };

  const handlePrevClick = (e) => {
    trackEvent({
      category,
      action: "form-vorige-knop",
      name,
    });

    if (onGoToPrev) onGoToPrev(e);
  };

  return (
    <NavStyle>
      <div>
        {showNext && (
          <Button
            type="submit"
            variant="secondary"
            onClick={handleNextClick}
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
            variant="textButton"
            style={{ marginLeft: 10 }}
            onClick={handlePrevClick}
            type="button"
            data-testid={PREV_BUTTON}
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
  page: "undefined-page",
  nextText: "Volgende",
  prevText: "Vorige",
  formEnds: false,
};

Nav.propTypes = {
  page: PropTypes.string,
  showPrev: PropTypes.bool,
  onGoToPrev: PropTypes.func,
  onGoToNext: PropTypes.func,
  showNext: PropTypes.bool,
  nextText: PropTypes.string,
  prevText: PropTypes.string,
  formEnds: PropTypes.bool,
};

export default Nav;
