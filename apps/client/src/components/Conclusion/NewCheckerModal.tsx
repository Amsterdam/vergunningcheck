import { ErrorMessage, Paragraph, Radio, RadioGroup } from "@datapunt/asc-ui";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { ComponentWrapper, Label } from "../../atoms";
import { topics } from "../../config";
import { actions, eventNames, sections } from "../../config/matomo";
import { SessionContext, SessionDataType } from "../../context";
import withTracking from "../../hoc/withTracking";
import Modal from "../Modal";

const NewCheckerModal: React.FC<{
  matomoTrackEvent: Function;
}> = ({ matomoTrackEvent }) => {
  // @TODO: replace with custom topic hooks
  const sessionContext = useContext<SessionDataType & { setSessionData?: any }>(
    SessionContext
  );
  const { slug } = useParams<{ slug: string }>();
  const [checkerSlug, setCheckerSlug] = useState("");
  const [finished, setFinished] = useState(false);
  const [hasError, setError] = useState(false);
  const [saveAddress, setSaveAddress] = useState<null | boolean>(null);

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

    setError(!checkerSlug);
    setFinished(!!checkerSlug);

    if (checkerSlug) {
      const address = saveAddress ? sessionContext[slug].address : null;

      // Clear or set session data for the new checker
      sessionContext.setSessionData([
        checkerSlug,
        {
          activeComponents: [sections.QUESTIONS],
          address: address,
          questionIndex: 0,
          answers: null,
          finishedComponents: [sections.LOCATION_RESULT],
        },
      ]);

      return (window.location.href = `/${checkerSlug}/vragen-en-conclusie?loadChecker`);
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
        <Paragraph strong gutterBottom={8}>
          Wilt u nog een vergunningcheck doen voor hetzelfde adres?
        </Paragraph>
        <RadioGroup name="address">
          <Label htmlFor="address-input-1" label="Ja">
            <Radio
              checked={saveAddress === true}
              id="address-input-1"
              onChange={() => setSaveAddress(true)}
            />
          </Label>
          <Label htmlFor="address-input-2" label="Nee">
            <Radio
              checked={saveAddress === false}
              id="address-input-2"
              onChange={() => setSaveAddress(false)}
            />
          </Label>
        </RadioGroup>
      </ComponentWrapper>

      <ComponentWrapper>
        <Paragraph strong gutterBottom={8}>
          Welke vergunningcheck wilt u doen?
        </Paragraph>

        <ComponentWrapper>
          <RadioGroup name="checkers">
            {topics
              .filter((topic) => topic.sttrFile)
              .map(({ name, slug }) => (
                <Label htmlFor={slug} key={name} label={name}>
                  <Radio
                    checked={checkerSlug === slug}
                    error={!!hasError}
                    id={slug}
                    onChange={() => {
                      setError(false);
                      setCheckerSlug(slug);
                    }}
                  />
                </Label>
              ))}
          </RadioGroup>

          <ErrorMessage message={hasError ? "Maak een keuze" : ""} />
        </ComponentWrapper>
      </ComponentWrapper>
    </Modal>
  );
};

export default withTracking(NewCheckerModal);
