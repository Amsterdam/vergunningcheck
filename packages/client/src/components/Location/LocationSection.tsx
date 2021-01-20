import React, { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { autofillResolvers, getDataNeed } from "../../config/autofill";
import { actions, eventNames, sections } from "../../config/matomo";
import { useChecker, useTopicData, useTracking } from "../../hooks";
import { Address, SectionComponent } from "../../types";
import { StepByStepItem } from "../StepByStepNavigation";
import LocationSummary from "./LocationSummary";
import { LocationInput } from ".";

const LocationSection: FunctionComponent<SectionComponent> = (props) => {
  const { checker } = useChecker();
  const [autoCompleteSection, setAutoCompleteSection] = useState(false);
  const {
    setTopicData,
    topicData: { address, sectionData, timesCheckerLoaded },
  } = useTopicData();
  const { matomoTrackEvent } = useTracking();
  const { t } = useTranslation();

  const {
    currentSection: { isActive, isCompleted },
    sectionFunctions: { goToNextSection },
  } = props;

  // Show the Location Section only when required by `hasDataNeeds`
  const skipLocationSection = !!(checker && !getDataNeed(checker));

  useEffect(() => {
    if (timesCheckerLoaded === 1 && !skipLocationSection) {
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

      // Activate the first question
      checker.next();

      // TrackEvent for next step (only when active)
      matomoTrackEvent({
        action: actions.ACTIVE_STEP,
        name: sections.QUESTIONS,
      });
    }
    // eslint-disable-next-line
  }, [checker, isActive, skipLocationSection]);

  useEffect(() => {
    // Autocomplete the location section in case the NewCheckerModal has been used with a stored address

    // Detect if the user has used the NewCheckerModal with a stored address
    if (address && !sectionData.length && !autoCompleteSection) {
      setAutoCompleteSection(true);
    }

    // Wait until the sectionData has been set by CheckerPage and go to the next section
    if (isActive && sectionData.length && autoCompleteSection) {
      goToNextSection();
      setAutoCompleteSection(false);
    }
    // eslint-disable-next-line
  }, [isActive, sectionData.length, autoCompleteSection]);

  if (!checker || !sectionData || autoCompleteSection || skipLocationSection) {
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

  // Add an alternative heading here when adding the map
  const heading = t("location.address.heading");

  return (
    <StepByStepItem
      active={isActive}
      checked={isCompleted}
      customSize
      done={isActive}
      highlightActive
      largeCircle
      // @TODO: fix the style with the grey bottom-border
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
