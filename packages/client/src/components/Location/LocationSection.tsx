import { Paragraph } from "@amsterdam/asc-ui";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import addressMock from "../../__mocks__/address";
import { ComponentWrapper, EditButton, TextToEdit } from "../../atoms";
import { autofillResolvers, getDataNeed } from "../../config/autofill";
import { actions, eventNames, sections } from "../../config/matomo";
import { useChecker, useTopic, useTopicData, useTracking } from "../../hooks";
// @TODO: remove those files after demo
import MapLarge from "../../static/media/map-large.png";
import MapSmall from "../../static/media/map-small.png";
import { Address, SectionComponent } from "../../types";
import { LOCATION_SECTION } from "../../utils/test-ids";
import Form from "../Form";
import Nav from "../Nav";
import { StepByStepItem } from "../StepByStepNavigation";
import LocationSummary from "./LocationSummary";
import { LocationInput } from ".";

const LocationSection: FunctionComponent<SectionComponent> = (props) => {
  const { checker } = useChecker();
  const [autoCompleteSection, setAutoCompleteSection] = useState(false);
  const {
    setTopicData,
    topicData: { address, sectionData, timesLoaded },
  } = useTopicData();
  const { isPermitForm } = useTopic();
  const { matomoTrackEvent } = useTracking();
  const { t } = useTranslation();

  const {
    currentSection,
    sectionFunctions: { changeActiveSection, goToNextSection },
  } = props;
  const { isActive, isCompleted } = currentSection;

  // Show the Location Section only when required by `hasDataNeeds`
  const skipLocationSection = !!(
    checker &&
    !getDataNeed(checker) &&
    !isPermitForm
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

  const heading = isPermitForm
    ? t("location.map.heading")
    : t("location.address.heading");

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
      {isPermitForm && (
        // warning: this is only for demo purposes!
        // START DEMO
        <>
          {isActive ? (
            <Form
              onSubmit={() => {
                setTopicData({
                  address: addressMock[0].result.data.findAddress.exactMatch,
                });
                goToNextSection();
              }}
            >
              <Paragraph>
                Klik de boom aan op de kaart. U kunt meer bomen aanklikken.
              </Paragraph>
              {/* @TODO: remove the files after demo */}
              <img src={MapLarge} style={{ maxWidth: 900 }} alt="demo map" />
              <Nav nextText={t("common.to the questions")} showNext />
            </Form>
          ) : (
            <ComponentWrapper>
              <Paragraph gutterBottom={0}>
                <TextToEdit>Coordinaten</TextToEdit>{" "}
                <EditButton
                  onClick={() => changeActiveSection(currentSection)}
                />
              </Paragraph>
              <Paragraph>Amsterdam</Paragraph>
              <img src={MapSmall} style={{ maxWidth: 380 }} alt="demo map" />
            </ComponentWrapper>
          )}
        </>
        // END DEMO
      )}

      {!isPermitForm && (
        <>
          {isActive ? (
            <LocationInput
              {...{
                handleNewAddressSubmit,
              }}
            />
          ) : (
            <LocationSummary showEditLocationModal />
          )}
        </>
      )}
    </StepByStepItem>
  );
};

export default LocationSection;
