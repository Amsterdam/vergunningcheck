import { ChevronLeft } from "@datapunt/asc-assets";
import { Button } from "@datapunt/asc-ui";
import React, { useContext } from "react";
import { useRouteMatch } from "react-router-dom";

import { PrevButton } from "../atoms";
import { CheckerContext } from "../context";
import withTracking from "../hoc/withTracking";
import { getslug, routeConfig } from "../routes";
import { NEXT_BUTTON } from "../utils/test-ids";
import { IconContainer, IconLeft, NavStyle } from "./NavStyle";

type NavProps = {
  formEnds: boolean;
  matomoTrackEvent: any;
  nextText: string;
  noMarginBottom: boolean;
  onGoToNext: (event: React.FormEvent) => void;
  onGoToPrev: (event: React.FormEvent) => void;
  prevText: string;
  showNext: boolean;
  showPrev: boolean;
};

type TopicProps = { topic: { slug: string } };

type RouteProps = {
  name: string;
  component: React.LazyExoticComponent<() => any>;
  path: string;
  exact: boolean;
};

const Nav: React.FC<NavProps> = ({
  formEnds,
  matomoTrackEvent,
  nextText,
  noMarginBottom,
  onGoToNext,
  onGoToPrev,
  prevText,
  showNext,
  showPrev,
}) => {
  const {
    topic: { slug: name },
  } = useContext<TopicProps>(CheckerContext);
  const { path } = useRouteMatch();
  const route: RouteProps | undefined = routeConfig.find(
    (route: any): boolean => route.path === path
  );
  const category = route.name;

  const handleNextClick = (e: React.FormEvent) => {
    const action = formEnds
      ? getslug(nextText.toLowerCase())
      : "form-volgende-knop";

    matomoTrackEvent({
      category,
      action,
      name,
    });

    if (onGoToNext) onGoToNext(e);
  };

  const handlePrevClick = (e: React.FormEvent) => {
    matomoTrackEvent({
      category,
      action: "form-vorige-knop",
      name,
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
  prevText: "Vorige",
};

export default withTracking(Nav);
