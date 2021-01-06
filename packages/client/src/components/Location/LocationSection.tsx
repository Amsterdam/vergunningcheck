import React, { FunctionComponent } from "react";

import { autofillResolvers } from "../../config/autofill";
import { useChecker, useTopicData } from "../../hooks";
import { Address, SectionComponent } from "../../types";
import LocationSummary from "./LocationSummary";
import { LocationInput } from ".";

const LocationSection: FunctionComponent<SectionComponent> = (props) => {
  const { checker } = useChecker();
  const { setTopicData } = useTopicData();

  const {
    currentSection: { isActive },
    sectionFunctions: { goToNextSection },
  } = props;

  if (!checker) {
    return null;
  }

  // On LocationSubmit
  const handleNewAddressSubmit = (address: Address) => {
    setTopicData({
      address,
    });

    // Autofill `checker` when `address` is submitted
    checker.autofill(autofillResolvers, { address });

    goToNextSection();
  };

  return (
    <>
      {isActive && (
        <LocationInput
          {...{
            handleNewAddressSubmit,
          }}
        />
      )}
      {!isActive && <LocationSummary showEditLocationModal />}
    </>
  );
};

export default LocationSection;
