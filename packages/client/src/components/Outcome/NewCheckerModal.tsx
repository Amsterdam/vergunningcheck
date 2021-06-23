import React, {
  FunctionComponent,
  KeyboardEventHandler,
  useContext,
  useState,
} from "react";
import { Paragraph, Radio, RadioGroup } from "@amsterdam/asc-ui";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { Loading, ComponentWrapper, Label, Error as ErrorComponent } from "../../atoms";
import { CheckerContext } from "../../CheckerContext";
import { actions, eventNames, sections } from "../../config/matomo";
import { useSlug, useTopicData, useTracking } from "../../hooks";
import { geturl, routes } from "../../routes";
import { SessionContext, defaultTopicSession } from "../../SessionContext";

import { GraphQLTopic } from "../../types";

import Modal from "../Modal";

const query = loader("../../queries/Topics.graphql");

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

  const { loading, error, data } = useQuery<{
    topics: GraphQLTopic[];
  }>(query);

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <ErrorComponent stack={error.stack} content={error.message} />;
  }

  const { topics } = data as { topics: GraphQLTopic[] };

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
      // Update timesLoaded + 1 or reset to zero if going to a new checker
      timesLoaded: checkerSlug === slug ? topicData.timesLoaded + 1 : 0,
      type: checkerSlug,
    };

    // Clear checker
    if (checkerSlug === slug) {
      // Only change the topicData for the current topic
      setTopicData(newTopicData);

      matomoTrackEvent({
        action: actions.ACTIVE_STEP,
        name: sections.LOCATION_INPUT,
      });

      // Restart this checker
      history.push(geturl(routes.checker, { slug: checkerSlug }));
    } else {
      matomoTrackEvent({
        action: actions.CLICK_INTERNAL_NAVIGATION,
        name: sections.INTRO,
      });

      // Change the topicData for another topic
      setSession({
        [checkerSlug]: newTopicData,
      });
      history.push(geturl(routes.intro, { slug: checkerSlug }));
    }

    // Go to the new checker route
    setChecker(undefined);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    // Enable 'Enter' key to handle the confirmation
    if (event.key === "Enter") {
      handleConfirmButton();
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
              .filter(({ hasIMTR }) => hasIMTR)
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
                    onKeyDown={handleKeyDown}
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
