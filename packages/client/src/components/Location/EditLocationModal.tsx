import { Paragraph } from "@amsterdam/asc-ui";
import React, { useContext } from "react";

import { ComponentWrapper, EditButton } from "../../atoms";
import { actions, eventNames } from "../../config/matomo";
import { SessionContext, SessionDataType } from "../../context";
import withTracking, { MatomoTrackEventProps } from "../../hoc/withTracking";
import { LOCATION_MODAL_OPEN_BUTTON } from "../../utils/test-ids";
import Modal from "../Modal";

const EditLocationModal: React.FC<
  {
    resetChecker: () => void;
    slug: string;
  } & MatomoTrackEventProps
> = ({ matomoTrackEvent, resetChecker, slug }) => {
  // @TODO: replace this with React custom hooks
  const sessionContext = useContext<
    SessionDataType & { setSessionData?: any; resetSessionData?: any }
  >(SessionContext);

  const handleOpenModal = () => {
    matomoTrackEvent({
      action: actions.OPEN_MODAL,
      name: eventNames.OPEN_MODAL_EDIT_ADDRESS,
    });
  };

  const handleConfirmButton = () => {
    matomoTrackEvent({
      action: actions.EDIT_ADDRESS,
      name: `${eventNames.EDIT_ADDRESS} - ${eventNames.BACK} ${eventNames.GOTO_LOCATION} ${eventNames.FROM} ${sessionContext[slug].activeComponents[0]}`,
    });

    sessionContext.resetSessionData(slug);
    resetChecker();
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

export default withTracking(EditLocationModal);
