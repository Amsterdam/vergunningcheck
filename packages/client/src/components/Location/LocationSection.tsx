import React, { FunctionComponent, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { autofillResolvers, getDataNeed } from "../../config/autofill";
import { actions, eventNames, sections } from "../../config/matomo";
import { useChecker, useTopicData, useTracking } from "../../hooks";
import { Address, SectionComponent } from "../../types";
import { LOCATION_SECTION } from "../../utils/test-ids";
import { StepByStepItem } from "../StepByStepNavigation";
import LocationSummary from "./LocationSummary";
import { LocationInput } from ".";

const LocationSection: FunctionComponent<SectionComponent> = (props) => {
  const { checker } = useChecker();
  const {
    setTopicData,
    topicData: { address, sectionData, timesLoaded },
  } = useTopicData();
  const { matomoTrackEvent } = useTracking();
  const { t } = useTranslation();

  const {
    currentSection,
    sectionFunctions: { goToNextSection },
  } = props;
  const { isActive, isCompleted } = currentSection;

  // Show the Location Section only when required by `hasDataNeeds`
  const skipLocationSection = !!(
    checker &&
    !getDataNeed(checker)
  );

  useEffect(() => {
    if (timesLoaded === 1 && !skipLocationSection && !address) {
      // TrackEvent for active step (only on first load)
      matomoTrackEvent({
        action: actions.ACTIVE_STEP,
        name: sections.LOCATION_INPUT,
      });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (checker && isActive && skipLocationSection) {
      // Skip this section
      goToNextSection();

      // TrackEvent for next step (only when active)
      matomoTrackEvent({
        action: actions.ACTIVE_STEP,
        name: sections.QUESTIONS,
      });
    }
    // eslint-disable-next-line
  }, [checker, isActive, skipLocationSection]);

  if (!checker || !sectionData || skipLocationSection) {
    return null;
  }

  const handleNewAddressSubmit = (address: Address) => {
    checker.autofill(autofillResolvers, { address });

    // Activate the first question
    if (checker.stack.length === 0) {
      const next = checker.next();

      if (next) {
        // TrackEvent for first question
        matomoTrackEvent({
          action: checker.stack[0].text,
          name: eventNames.ACTIVE_QUESTION,
        });
      }
    }

    // Update session data with the new address
    setTopicData({
      address,
    });

    goToNextSection();

    // TrackEvent for active step
    matomoTrackEvent({
      action: actions.ACTIVE_STEP,
      name: sections.QUESTIONS,
    });
  };

  // The heading can be made dynamic when we're adding maps or "PermitForms"
  const heading = t("location.address.heading");

  return (
    <StepByStepItem
      active={isActive}
      activeStyle
      checked={isCompleted}
      customSize
      data-testid={LOCATION_SECTION}
      done={isActive}
      highlightActive
      largeCircle
      {...{ heading }}
    >
      {isActive ? (
        <LocationInput
          {...{
            handleNewAddressSubmit,
          }}
        />
      ) : (
        <LocationSummary showEditLocationModal />
      )}
    </StepByStepItem>
  );
};

export default LocationSection;
