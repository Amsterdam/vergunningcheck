// @TODO: Rename this file to EditLocation
// @TODO: Write test for this file
import { Paragraph } from "@datapunt/asc-ui";
import React, { useContext } from "react";

import { ComponentWrapper, EditButton } from "../../atoms";
import { actions, eventNames, sections } from "../../config/matomo";
import { SessionContext, SessionDataType } from "../../context";
import withTracking from "../../hoc/withTracking";
import Modal from "../Modal";

const ChangeAddressModal: React.FC<{
  matomoTrackEvent: Function;
  setActiveState: Function;
  slug: string;
  sttrFile: boolean;
}> = ({ matomoTrackEvent, setActiveState, slug, sttrFile }) => {
  // What's taking the React custom hooks so long?
  // @TODO: replace this
  const sessionContext = useContext<SessionDataType & { setSessionData?: any }>(
    SessionContext
  );

  const handleOpenModal = () => {
    // @TODO: Add event and remove temporary if statement
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

    // More or less copy pasted from NewCheckerModal
    // @TODO: make re-usable
    sessionContext.setSessionData([
      slug,
      {
        activeComponents: [sections.LOCATION_INPUT],
        address: null,
        answers: null,
        finishedComponents: [],
      },
    ]);

    return (window.location.href = `/${slug}/vragen-en-conclusie?loadChecker`);
  };

  return (
    <>
      {sttrFile ? (
        <Modal
          closeButtonText="Annuleer"
          handleConfirmButton={handleConfirmButton}
          handleOpenModal={handleOpenModal}
          heading="HEADING" // @TODO: update heading
          openButton={EditButton}
          showConfirmButton
        >
          <ComponentWrapper>
            <Paragraph>Lorem ipsum</Paragraph>
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
