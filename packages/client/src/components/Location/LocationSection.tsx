import React, { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { autofillResolvers, getDataNeed } from "../../config/autofill";
import { actions, eventNames, sections } from "../../config/matomo";
import { useChecker, useTopic, useTopicData, useTracking } from "../../hooks";
import { Address, SectionComponent } from "../../types";
import { LOCATION_SECTION } from "../../utils/test-ids";
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
  const { isPermitCheck } = useTopic();
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
    isPermitCheck &&
    !getDataNeed(checker)
  );

  useEffect(() => {
    if (timesCheckerLoaded === 1 && !skipLocationSection && !address) {
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
      if (address) {
        // In this case a NewCheckerModal has been used with a stored address, but the location section is not necessary
        // So remove the address data to restart initialisation to point the user to right section and question
        setTopicData({
          address: null,
        });
      } else {
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

  // @TODO: fix the active style in a proper way without `style`
  const activeStyle = { marginTop: -1, borderColor: "white" };

  return (
    <StepByStepItem
      active={isActive}
      checked={isCompleted}
      customSize
      data-testid={LOCATION_SECTION}
      done={isActive}
      highlightActive
      largeCircle
      style={activeStyle}
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
