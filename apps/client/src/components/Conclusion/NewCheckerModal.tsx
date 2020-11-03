import { ErrorMessage, Paragraph, Radio, RadioGroup } from "@datapunt/asc-ui";
import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";

import { ComponentWrapper, Label } from "../../atoms";
import { CheckerContext } from "../../CheckerContext";
import { requiredFieldRadio, topics } from "../../config";
import { actions, eventNames, sections } from "../../config/matomo";
import { useSlug, useTopicSession, useTracking } from "../../hooks";
import { geturl, routes } from "../../routes";
import { RADIO_ADDRESS_1, RADIO_ADDRESS_2 } from "../../utils/test-ids";
import Modal from "../Modal";

const NewCheckerModal: React.FC = () => {
  const { matomoTrackEvent } = useTracking();
  const { topicData, setTopicData } = useTopicSession();
  const { setChecker } = useContext(CheckerContext);
  const [finished, setFinished] = useState(false);
  const [hasError, setError] = useState(false);
  const [saveAddress, setSaveAddress] = useState<null | boolean>(null);

  const slug = useSlug() as string;
  const [checkerSlug, setCheckerSlug] = useState(slug);
  if (!slug) {
    throw new Error("Cannot render NewCheckerModal without a slug.");
  }

  const handleOpenModal = () => {
    matomoTrackEvent({
      action: actions.OPEN_MODAL,
      name: eventNames.DO_ANOTHER_CHECK,
    });

    setError(false);
  };

  const handleConfirmButton = () => {
    const saveAddressText = saveAddress
      ? eventNames.WITH_THE_SAME_ADDRESS
      : eventNames.WITHOUT_THE_SAME_ADDRESS;
    matomoTrackEvent({
      action: actions.START_ANOTHER_CHECK,
      name: checkerSlug
        ? `${checkerSlug.replace("-", " ")} - ${saveAddressText}`
        : eventNames.NO_CHOICE_HAS_BEEN_MADE,
    });

    setError(saveAddress === null);
    setFinished(!!checkerSlug);

    if (saveAddress !== null) {
      const activeComponents = saveAddress
        ? sections.QUESTIONS
        : sections.LOCATION_INPUT;

      // Clear or set session data for the new checker
      setTopicData({
        activeComponents: [activeComponents],
        address: saveAddress ? topicData.address : null,
        answers: {},
        finishedComponents: saveAddress ? [sections.LOCATION_RESULT] : [],
        questionIndex: 0,
      });

      setChecker(null);
      return <Redirect to={geturl(routes.checker, { slug: checkerSlug })} />;
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
      <ComponentWrapper>
        <Paragraph gutterBottom={8} strong>
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
        <ErrorMessage message={hasError ? requiredFieldRadio : ""} />
      </ComponentWrapper>

      <ComponentWrapper>
        <Paragraph strong gutterBottom={8}>
          Welke vergunningcheck wilt u doen?
        </Paragraph>

        <ComponentWrapper>
          <RadioGroup name="checkers">
            {topics
              .filter((topic) => topic.sttrFile)
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
