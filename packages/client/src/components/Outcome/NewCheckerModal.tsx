import { ErrorMessage, Paragraph, Radio, RadioGroup } from "@amsterdam/asc-ui";
import React, { FunctionComponent, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { ComponentWrapper, Label } from "../../atoms";
import { CheckerContext } from "../../CheckerContext";
import { topics } from "../../config";
import { actions, eventNames, sections } from "../../config/matomo";
import { useSlug, useTopicData, useTracking } from "../../hooks";
import { geturl, routes } from "../../routes";
import { SessionContext, defaultTopicSession } from "../../SessionContext";
import {
  NEW_CHECKER_MODAL_SAME_ADDRESS,
  RADIO_ADDRESS_1,
  RADIO_ADDRESS_2,
} from "../../utils/test-ids";
import Modal from "../Modal";

const NewCheckerModal: FunctionComponent = () => {
  const { matomoTrackEvent } = useTracking();
  const { topicData, setTopicData } = useTopicData();
  const slug = useSlug();
  const { setChecker } = useContext(CheckerContext);
  const { setSession } = useContext(SessionContext);
  const { t } = useTranslation();
  const [checkerSlug, setCheckerSlug] = useState(slug);
  const history = useHistory();
  const [finished, setFinished] = useState(false);
  const [hasError, setError] = useState(false);
  const [saveAddress, setSaveAddress] = useState<null | boolean>(
    // If there are no data-needs we skip the question to save your address
    topicData.address ? null : false
  );

  if (!slug) {
    throw new Error("Cannot render NewCheckerModal without a slug.");
  }

  const handleOpenModal = () => {
    matomoTrackEvent({
      action: actions.OPEN_MODAL,
      name: eventNames.OPEN_MODAL_DO_ANOTHER_CHECK,
    });

    setError(false);
  };

  const handleConfirmButton = () => {
    const hasError = saveAddress === null;

    setError(hasError);

    if (hasError) {
      matomoTrackEvent({
        action: actions.START_ANOTHER_CHECK,
        name: `${eventNames.DO_ANOTHER_CHECK} - ${eventNames.NO_CHOICE_HAS_BEEN_MADE}`,
      });
    } else {
      setFinished(!!checkerSlug);

      const doSaveAddress = saveAddress === true;

      matomoTrackEvent({
        action: actions.START_ANOTHER_CHECK,
        name: `${eventNames.DO_ANOTHER_CHECK} - ${
          doSaveAddress
            ? eventNames.WITH_THE_SAME_ADDRESS
            : eventNames.WITHOUT_THE_SAME_ADDRESS
        }`,
      });

      // Set the new topic data with the correct `type` and potentially the `address`
      const newTopicData = {
        ...defaultTopicSession,
        // Optionally save address
        address: doSaveAddress ? topicData.address : null,
        // Update timesCheckerLoaded + 1 or reset to zero if going to a new checker
        timesCheckerLoaded:
          checkerSlug === slug ? topicData.timesCheckerLoaded + 1 : 0,
        type: checkerSlug,
      };

      if (checkerSlug === slug) {
        // Only change the topicData for the current topic
        setTopicData(newTopicData);

        matomoTrackEvent({
          action: actions.ACTIVE_STEP,
          name: doSaveAddress ? sections.QUESTIONS : sections.LOCATION_INPUT,
        });
      } else {
        // Change the topicData for another topic
        setSession({
          [checkerSlug]: newTopicData,
        });
      }

      // Clear checker and go to the new topic slug
      setChecker(undefined);
      history.push(geturl(routes.checker, { slug: checkerSlug }));
    }
  };

  return (
    <Modal
      closeButtonText="Annuleer"
      closeModalAfterConfirm={finished}
      handleConfirmButton={handleConfirmButton}
      handleOpenModal={handleOpenModal}
      heading="U wilt nog een vergunningcheck doen."
      openButtonText="Nog een vergunningcheck doen"
      showConfirmButton
    >
      {topicData.address && (
        // Do not show this part for checkers without data need
        <ComponentWrapper>
          <Paragraph
            data-testid={NEW_CHECKER_MODAL_SAME_ADDRESS}
            gutterBottom={8}
            strong
          >
            Wilt u nog een vergunningcheck doen voor hetzelfde adres?
          </Paragraph>
          <RadioGroup name="address">
            <Label htmlFor="address-input-1" label="Ja">
              <Radio
                checked={saveAddress === true}
                data-testid={RADIO_ADDRESS_1}
                error={!!hasError}
                id="address-input-1"
                onChange={() => setSaveAddress(true)}
              />
            </Label>
            <Label htmlFor="address-input-2" label="Nee">
              <Radio
                checked={saveAddress === false}
                data-testid={RADIO_ADDRESS_2}
                error={!!hasError}
                id="address-input-2"
                onChange={() => setSaveAddress(false)}
              />
            </Label>
          </RadioGroup>
          <ErrorMessage
            message={hasError ? t("common.required field radio") : ""}
          />
        </ComponentWrapper>
      )}

      <ComponentWrapper>
        <Paragraph strong gutterBottom={8}>
          Welke vergunningcheck wilt u doen?
        </Paragraph>

        <ComponentWrapper>
          <RadioGroup name="checkers">
            {topics
              .filter((topic) => topic.hasIMTR)
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(({ name, slug }) => (
                <Label htmlFor={slug} key={name} label={name}>
                  <Radio
                    checked={checkerSlug === slug}
                    data-testid={`radio-checker-${slug}`}
                    id={slug}
                    onChange={() => {
                      setError(false);
                      setCheckerSlug(slug);
                    }}
                  />
                </Label>
              ))}
          </RadioGroup>
        </ComponentWrapper>
      </ComponentWrapper>
    </Modal>
  );
};

export default NewCheckerModal;
