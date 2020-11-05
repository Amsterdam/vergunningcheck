import { ErrorMessage, Paragraph, Radio, RadioGroup } from "@amsterdam/asc-ui";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { ComponentWrapper, Label } from "../../atoms";
import { requiredFieldRadio, topics } from "../../config";
import { actions, eventNames, sections } from "../../config/matomo";
import { SessionContext, SessionDataType } from "../../context";
import withTracking, { MatomoTrackEventProps } from "../../hoc/withTracking";
import { RADIO_ADDRESS_1, RADIO_ADDRESS_2 } from "../../utils/test-ids";
import Modal from "../Modal";

const NewCheckerModal: React.FC<MatomoTrackEventProps> = ({
  matomoTrackEvent,
}) => {
  // @TODO: replace with custom topic hooks
  const sessionContext = useContext<SessionDataType & { setSessionData?: any }>(
    SessionContext
  );
  const { slug } = useParams<{ slug: string }>();
  const [checkerSlug, setCheckerSlug] = useState(slug);
  const [finished, setFinished] = useState(false);
  const [hasError, setError] = useState(false);
  const [saveAddress, setSaveAddress] = useState<null | boolean>(null);

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
      const saveAddressEvent = doSaveAddress
        ? eventNames.WITH_THE_SAME_ADDRESS
        : eventNames.WITHOUT_THE_SAME_ADDRESS;

      matomoTrackEvent({
        action: actions.START_ANOTHER_CHECK,
        name: `${eventNames.DO_ANOTHER_CHECK} - ${saveAddressEvent}`,
      });

      const address = saveAddress ? sessionContext[slug].address : null;
      const activeComponents = saveAddress
        ? sections.QUESTIONS
        : sections.LOCATION_INPUT;
      const finishedComponents = saveAddress && sections.LOCATION_INPUT;
      // Clear or set session data for the new checker
      sessionContext.setSessionData([
        checkerSlug,
        {
          activeComponents: [activeComponents],
          address,
          answers: null,
          finishedComponents: [finishedComponents],
          questionIndex: 0,
        },
      ]);

      // @TODO: We need to find a better solution for restarting the same checker.
      window.location.href = `/${checkerSlug}/vragen-en-conclusie?loadChecker`;
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

export default withTracking(NewCheckerModal);
