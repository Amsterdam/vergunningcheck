import React, { FunctionComponent, useContext } from "react";

import { CheckerContext } from "../../CheckerContext";
import { autofillResolvers } from "../../config/autofill";
import { actions, sections } from "../../config/matomo";
import { useChecker, useTopicData, useTracking } from "../../hooks";
import { Address, SectionComponent } from "../../types";
import LocationSummary from "./LocationSummary";
import { LocationInput } from ".";

const LocationSection: FunctionComponent<SectionComponent> = (props) => {
  const { checker } = useChecker();
  const checkerContext = useContext(CheckerContext);
  const { setTopicData } = useTopicData();
  const { matomoTrackEvent } = useTracking();

  const {
    currentSection: { isActive },
    sectionFunctions: { goToNextSection },
  } = props;

  if (!checker) {
    return null;
  }

  const handleNewAddressSubmit = (address: Address) => {
    // @TODO: fix the autofill bug
    const skipTheBug = true;

    if (skipTheBug) {
      // Reset checker to fix the autofill bug
      checkerContext.setChecker(undefined);
    } else {
      checker.autofill(autofillResolvers, { address });
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
