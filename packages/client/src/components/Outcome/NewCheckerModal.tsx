import { Paragraph, Radio, RadioGroup } from "@amsterdam/asc-ui";
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

  if (!slug) {
    throw new Error("Cannot render NewCheckerModal without a slug.");
  }

  const handleOpenModal = () => {
    matomoTrackEvent({
      action: actions.OPEN_MODAL,
      name: eventNames.OPEN_MODAL_DO_ANOTHER_CHECK,
    });
  };

  const handleConfirmButton = () => {
    setFinished(!!checkerSlug);

    matomoTrackEvent({
      action: actions.START_ANOTHER_CHECK,
      name: eventNames.DO_ANOTHER_CHECK,
    });

    // Set the new topic data with the correct `type` and potentially the `address`
    const newTopicData = {
      ...defaultTopicSession,
      address: topicData.address,
      // Update timesCheckerLoaded + 1 or reset to zero if going to a new checker
      timesCheckerLoaded:
        checkerSlug === slug ? topicData.timesCheckerLoaded + 1 : 0,
      type: checkerSlug,
    };

    // Clear checker
    setChecker(undefined);
    if (checkerSlug === slug) {
      // Only change the topicData for the current topic
      setTopicData(newTopicData);

      matomoTrackEvent({
        action: actions.CLICK_INTERNAL_NAVIGATION,
        name: sections.INTRO,
      });
      history.push(geturl(routes.checker, { slug: checkerSlug }));
    } else {
      // Change the topicData for another topic
      setSession({
        [checkerSlug]: newTopicData,
      });
      history.push(geturl(routes.intro, { slug: checkerSlug }));
    }
  };

  return (
    <Modal
      closeButtonText={t("common.cancel")}
      closeModalAfterConfirm={finished}
      handleConfirmButton={handleConfirmButton}
      handleOpenModal={handleOpenModal}
      heading={t("outcome.newCheckerModal.heading")}
      openButtonText={t("outcome.newCheckerModal.openModalBtnText")}
      showConfirmButton
    >
      <ComponentWrapper>
        <Paragraph strong gutterBottom={8}>
          {t("outcome.newCheckerModal.selectNextPermitCheck")}
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
