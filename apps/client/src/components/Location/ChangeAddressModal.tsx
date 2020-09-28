import { Paragraph } from "@datapunt/asc-ui";
import React from "react";

import { ComponentWrapper } from "../../atoms";
import { actions } from "../../config/matomo";
import withTracking from "../../hoc/withTracking";
import Modal from "../Modal";

const ChangeAddressModal: React.FC<{
  matomoTrackEvent: Function;
}> = ({ matomoTrackEvent }) => {
  const handleOpenModal = () => {
    // @TODO: Add event
    matomoTrackEvent({
      action: actions.OPEN_MODAL,
      name: "EDIT ADDRESS EVENT NAME",
    });
  };

  const handleConfirmButton = () => {
    // @TODO: Update original event
    // matomoTrackEvent({
    //   action: actions.CLICK_INTERNAL_NAVIGATION,
    //   name: eventNames.EDIT_ADDRESS,
    // });
    // @TODO: Clear address
  };

  return (
    <Modal
      closeButtonText="Annuleer"
      handleConfirmButton={handleConfirmButton}
      handleOpenModal={handleOpenModal}
      heading="HEADING" // @TODO: update heading
      openButtonText="Wijzig"
      openButtonVariant="textButton" // @TODO: pass component to open button instead of variant
      showConfirmButton
    >
      <ComponentWrapper>
        <Paragraph>Lorem ipsum</Paragraph>
      </ComponentWrapper>
    </Modal>
  );
};

export default withTracking(ChangeAddressModal);
