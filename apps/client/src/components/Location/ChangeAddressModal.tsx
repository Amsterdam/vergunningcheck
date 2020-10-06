// @TODO: Rename this file to EditLocation
// @TODO: Write test for this file
import { Paragraph } from "@amsterdam/asc-ui";
import React, { useContext } from "react";

import { ComponentWrapper, EditButton } from "../../atoms";
import { actions, eventNames, sections } from "../../config/matomo";
import { SessionContext, SessionDataType } from "../../context";
import withTracking from "../../hoc/withTracking";
import { MODAL_OPEN_BUTTON } from "../../utils/test-ids";
import Modal from "../Modal";

const ChangeAddressModal: React.FC<{
  checker: any;
  hasIMTR: boolean;
  matomoTrackEvent: Function;
  resetChecker: Function;
  setActiveState: Function;
  slug: string;
}> = ({ matomoTrackEvent, setActiveState, resetChecker, slug, hasIMTR }) => {
  // @TODO: replace this with React custom hooks
  const sessionContext = useContext<
    SessionDataType & { setSessionData?: any; resetSessionData?: any }
  >(SessionContext);

  const handleOpenModal = () => {
    matomoTrackEvent({
      action: actions.OPEN_MODAL,
      name: eventNames.OPEN_CHANGE_ADDRESS_MODAL,
    });
  };

  const handleConfirmButton = () => {
    matomoTrackEvent({
      action: actions.CLICK_INTERNAL_NAVIGATION,
      name: eventNames.EDIT_ADDRESS,
    });

    // More or less copy pasted from NewCheckerModal
    sessionContext.resetSessionData(slug);
    resetChecker();

    return (window.location.href = `/${slug}/vragen-en-conclusie`);
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

export default withTracking(ChangeAddressModal);
