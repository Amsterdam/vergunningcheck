import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Button } from "@datapunt/asc-ui";
import { ChevronLeft } from "@datapunt/asc-assets";
import { useMatomo } from "@datapunt/matomo-tracker-react";

import { NEXT_BUTTON, PREV_BUTTON } from "../utils/test-ids";
import { NavStyle, IconContainer, IconLeft } from "./NavStyle";
import { useRouteMatch } from "react-router-dom";
import { routeConfig, getslug } from "../routes";
import Context from "../context";
import { isProduction } from "../config";

const Nav = ({
  prevText,
  showPrev,
  onGoToPrev,
  showNext,
  nextText,
  formEnds,
}) => {
  const {
    topic: { slug: name },
    trackEvents,
  } = useContext(Context);
  const { trackEvent } = useMatomo();
  const { path } = useRouteMatch();
  const route = routeConfig.find((route) => route.path === path);
  const category = route.matomoPage || route.name;

  const handleNextClick = () => {
    const action = formEnds
      ? getslug(nextText.toLowerCase())
      : "form-volgende-knop";
    if (trackEvents && isProduction) {
      trackEvent({
        category,
        action,
        name,
      });
    }
  };
  const handlePrevClick = (e) => {
    if (trackEvents && isProduction) {
      trackEvent({
        category,
        action: "form-vorige-knop",
        name,
      });
    }
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
  showNext: PropTypes.bool,
  nextText: PropTypes.string,
  prevText: PropTypes.string,
  formEnds: PropTypes.bool,
};

export default Nav;
