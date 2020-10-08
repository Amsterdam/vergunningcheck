import { Paragraph } from "@amsterdam/asc-ui";
import React, { useContext } from "react";

import { ComponentWrapper, EditButton } from "../../atoms";
import { actions, eventNames, sections } from "../../config/matomo";
import { SessionContext, SessionDataType } from "../../context";
import withTracking from "../../hoc/withTracking";
import { MODAL_OPEN_BUTTON } from "../../utils/test-ids";
import Modal from "../Modal";

const EditLocation: React.FC<{
  hasIMTR?: boolean;
  matomoTrackEvent: Function;
  resetChecker: Function;
  setActiveState: Function;
  slug: string;
}> = ({ matomoTrackEvent, resetChecker, setActiveState, slug, hasIMTR }) => {
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
      name: `${eventNames.EDIT_ADDRESS} - ${eventNames.BACK} ${eventNames.GOTO_LOCATION}`,
    });

    // More or less copy pasted from NewCheckerModal
    sessionContext.resetSessionData(slug);
    resetChecker();
  };

  return (
    <>
      {hasIMTR ? (
        <Modal
          closeButtonText="Nee"
          confirmText="Ja"
          handleConfirmButton={handleConfirmButton}
          handleOpenModal={handleOpenModal}
          heading="Weet u zeker dat u het adres wilt wijzigen?"
          openButtonRenderer={({ openModal }: { openModal: Function }) => (
            <EditButton
              data-testid={MODAL_OPEN_BUTTON}
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
              Alle gegeven antwoorden en de conclusie worden gewist. Weet u
              zeker dat u wilt doorgaan met een ander adres?
            </Paragraph>
          </ComponentWrapper>
        </Modal>
      ) : (
        <EditButton
          onClick={() => {
            matomoTrackEvent({
              action: actions.CLICK_INTERNAL_NAVIGATION,
              name: eventNames.EDIT_ADDRESS,
            });
            setActiveState(sections.LOCATION_INPUT);
          }}
        />
      )}
    </>
  );
};

export default withTracking(EditLocation);
