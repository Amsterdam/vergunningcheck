import { Paragraph } from "@amsterdam/asc-ui";
import React from "react";

import { ComponentWrapper, EditButton } from "../../atoms";
import { actions, eventNames } from "../../config/matomo";
import { useChecker, useTopicData, useTracking } from "../../hooks";
import { LOCATION_MODAL_OPEN_BUTTON } from "../../utils/test-ids";
import Modal from "../Modal";

const EditLocationModal: React.FC = () => {
  const { matomoTrackEvent } = useTracking();
  const { setChecker } = useChecker();
  const { setTopicData } = useTopicData();

  const handleOpenModal = () => {
    matomoTrackEvent({
      action: actions.OPEN_MODAL,
      name: eventNames.OPEN_MODAL_EDIT_ADDRESS,
    });
  };

  const handleConfirmButton = () => {
    matomoTrackEvent({
      action: actions.EDIT_ADDRESS,
      name: `${eventNames.EDIT_ADDRESS} - ${eventNames.BACK} ${eventNames.GOTO_LOCATION}`,
    });

    setTopicData(null);
    setChecker(undefined);
  };

  return (
    <Modal
      closeButtonText="Nee"
      confirmText="Ja"
      handleConfirmButton={handleConfirmButton}
      handleOpenModal={handleOpenModal}
      heading="Weet u zeker dat u het adres wilt wijzigen?"
      openButtonRenderer={({ openModal }: { openModal: () => void }) => (
        <EditButton
          dataTestid={LOCATION_MODAL_OPEN_BUTTON}
          onClick={() => {
            // Open modal function
            openModal();
          }}
        />
      )}
      showConfirmButton
    >
      <ComponentWrapper>
        <Paragraph>
          Alle gegeven antwoorden en de uitkomst worden gewist. Weet u zeker dat
          u wilt doorgaan met een ander adres?
        </Paragraph>
      </ComponentWrapper>
    </Modal>
  );
};

export default EditLocationModal;
