import React, { FunctionComponent, useEffect, useState } from "react";

import { autofillResolvers } from "../../config/autofill";
import { actions, eventNames, sections } from "../../config/matomo";
import { useChecker, useTopicData, useTracking } from "../../hooks";
import { Address, SectionComponent } from "../../types";
import LocationSummary from "./LocationSummary";
import { LocationInput } from ".";

const LocationSection: FunctionComponent<SectionComponent> = (props) => {
  const { checker } = useChecker();
  const {
    setTopicData,
    topicData: { address, sectionData, timesCheckerLoaded },
  } = useTopicData();
  const { matomoTrackEvent } = useTracking();
  const [skipSection, setSkipSection] = useState(false);

  const {
    currentSection: { isActive },
    sectionFunctions: { goToNextSection },
  } = props;

  useEffect(() => {
    if (timesCheckerLoaded === 1) {
      // TrackEvent for active step (only on first load)
      matomoTrackEvent({
        action: actions.ACTIVE_STEP,
        name: sections.LOCATION_INPUT,
      });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Autocomplete the location section in case the NewCheckerModal has been used with a stored address

    // Detect if the user has used the NewCheckerModal with a stored address
    if (address && !sectionData.length && !skipSection) {
      setSkipSection(true);
    }

    // Wait until the sectionData has been set by CheckerPage and go to the next section
    if (isActive && sectionData.length && skipSection) {
      goToNextSection();
      setSkipSection(false);
    }
    // eslint-disable-next-line
  }, [isActive, sectionData.length, skipSection]);

  if (!checker || !sectionData || skipSection) {
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

    // Go to Question Section
    goToNextSection();

    // TrackEvent for active step
    matomoTrackEvent({
      action: actions.ACTIVE_STEP,
      name: sections.QUESTIONS,
    });
  };

  return isActive ? (
    <LocationInput
      {...{
        handleNewAddressSubmit,
      }}
    />
  ) : (
    <LocationSummary showEditLocationModal />
  );
};

export default LocationSection;
