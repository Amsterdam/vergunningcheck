import { Paragraph } from "@amsterdam/asc-ui";
import React, { FunctionComponent, useEffect } from "react";
import { useTranslation } from "react-i18next";

import addressMock from "../../__mocks__/address";
import { ComponentWrapper, EditButton, Form, TextToEdit } from "../../atoms";
import { autofillResolvers, getDataNeed } from "../../config/autofill";
import { actions, eventNames, sections } from "../../config/matomo";
import { useChecker, useTopic, useTopicData, useTracking } from "../../hooks";
// @TODO: remove those files after demo
import MapLarge from "../../static/media/map-large.png";
import MapSmall from "../../static/media/map-small.png";
import { Address, SectionComponent } from "../../types";
import { LOCATION_SECTION } from "../../utils/test-ids";
import Nav from "../Nav";
import { StepByStepItem } from "../StepByStepNavigation";
import LocationSummary from "./LocationSummary";
import { LocationInput } from ".";

const LocationSection: FunctionComponent<SectionComponent> = (props) => {
  const { checker } = useChecker();
  const {
    setTopicData,
    topicData: { address, sectionData, timesLoaded },
  } = useTopicData();
  const { isPermitCheck, isPermitForm } = useTopic();
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
    isPermitCheck &&
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

  const heading = isPermitCheck
    ? t("location.address.heading")
    : t("location.map.heading");

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
      {isPermitForm && (
        // The Permit Form is still in development. This is only for demo purposes
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
