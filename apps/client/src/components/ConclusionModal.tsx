import { Label, Paragraph, Radio, RadioGroup } from "@datapunt/asc-ui";
import React from "react";

import { ComponentWrapper } from "../atoms";
import { topics } from "../config";
import { actions, eventNames } from "../config/matomo";
import withTracking from "../hoc/withTracking";
import Modal from "./Modal";

type Props = {
  matomoTrackEvent: Function;
};

const ConclusionModal: React.FC<Props> = ({ matomoTrackEvent }) => {
  const [closeModal, setCloseModal] = React.useState(false);

  const handleOpenModal = () => {
    setCloseModal(false);

    matomoTrackEvent({
      action: actions.CLICK_INTERNAL_NAVIGATION,
      name: eventNames.START_NEW_CHECK,
    });
  };

  const handleConfirmButton = () => {
    // matomoTrackEvent({
    //   action: actions.CLICK_INTERNAL_NAVIGATION,
    //   name: eventNames.START_NEW_CHECK,
    // });
    setCloseModal(true);
  };

  return (
    <Modal
      closeModal={closeModal}
      openButtonText="Nog een vergunningcheck doen"
      heading="U wilt nog een vergunningcheck doen."
      handleConfirmButton={handleConfirmButton}
      handleOpenModal={handleOpenModal}
    >
      <ComponentWrapper>
        <Paragraph strong gutterBottom={8}>
          Wilt u nog een vergunningcheck doen voor hetzelfde adres?
        </Paragraph>
        <RadioGroup name="adres">
          <Label htmlFor="adres-ja" label="Ja">
            <Radio value="ja" id="adres-ja" />
          </Label>
          <Label htmlFor="adres-nee" label="Nee">
            <Radio value="nee" id="adres-nee" />
          </Label>
        </RadioGroup>
      </ComponentWrapper>

      <ComponentWrapper>
        <Paragraph strong gutterBottom={8}>
          Welke vergunningcheck wilt u doen?
        </Paragraph>

        <ComponentWrapper>
          <RadioGroup name="checks">
            {topics
              .filter((topic) => topic.sttrFile)
              .map((topic) => (
                <Label htmlFor={topic.name} label={topic.name} key={topic.name}>
                  <Radio
                    value={topic.slug}
                    id={topic.name}
                    // onChange={(e) => onChange(e)}
                  />
                </Label>
              ))}
          </RadioGroup>
        </ComponentWrapper>
      </ComponentWrapper>
    </Modal>
  );
};

export default withTracking(ConclusionModal);
