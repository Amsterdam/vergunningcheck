import { ChevronLeft } from "@datapunt/asc-assets";
import { Button } from "@datapunt/asc-ui";
import PropTypes from "prop-types";
import React from "react";
import { useParams, useRouteMatch } from "react-router-dom";

import { PrevButton } from "../atoms";
import withTracking from "../hoc/withTracking";
import { getslug, routeConfig } from "../routes";
import { NEXT_BUTTON } from "../utils/test-ids";
import { IconContainer, IconLeft, NavStyle } from "./NavStyle";

const Nav = ({
  formEnds,
  nextText,
  matomoTrackEvent,
  noMarginBottom,
  onGoToNext,
  onGoToPrev,
  prevText,
  showNext,
  showPrev,
}) => {
  const { slug } = useParams();
  const { path } = useRouteMatch();
  const route = routeConfig.find((route) => route.path === path);
  const category = route.matomoPage || route.name;

  const handleNextClick = (e) => {
    const action = formEnds
      ? getslug(nextText.toLowerCase())
      : "form-volgende-knop";

    matomoTrackEvent({
      category,
      action,
      name: slug,
    });

    if (onGoToNext) onGoToNext(e);
  };

  const handlePrevClick = (e) => {
    matomoTrackEvent({
      category,
      action: "form-vorige-knop",
      name: slug,
    });

    if (onGoToPrev) onGoToPrev(e);
  };

  return (
    <NavStyle noMarginBottom={noMarginBottom}>
      {showNext && (
        <Button
          data-testid={NEXT_BUTTON}
          onClick={handleNextClick}
          style={{ marginRight: formEnds ? 10 : 25 }}
          taskflow={!formEnds}
          type="submit"
          variant="secondary"
        >
          {nextText}
        </Button>
      )}
      {showPrev && (
        <PrevButton onClick={handlePrevClick}>
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

export default withTracking(Nav);
