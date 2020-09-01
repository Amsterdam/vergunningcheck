import { ChevronLeft } from "@datapunt/asc-assets";
import { Button } from "@datapunt/asc-ui";
import { useMatomo } from "@datapunt/matomo-tracker-react";
import PropTypes from "prop-types";
import React from "react";
import { useRouteMatch } from "react-router-dom";

import { PrevButton } from "../atoms";
import { useTopic } from "../hooks";
import { getslug, routeConfig } from "../routes";
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
  const topic = useTopic();
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
      name: topic.slug,
    });

    if (onGoToNext) onGoToNext(e);
  };

  const handlePrevClick = (e) => {
    trackEvent({
      category,
      action: "form-vorige-knop",
      name: topic.slug,
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

export default Nav;
