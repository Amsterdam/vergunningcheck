// @TODO: Rename this file to EditLocation
// @TODO: Write test for this file
import { Paragraph } from "@datapunt/asc-ui";
import React, { useContext } from "react";

import { ComponentWrapper, EditButton } from "../../atoms";
import { actions, eventNames, sections } from "../../config/matomo";
import { SessionContext, SessionDataType } from "../../context";
import withTracking from "../../hoc/withTracking";
import { MODAL_OPEN_BUTTON } from "../../utils/test-ids";
import Modal from "../Modal";

const ChangeAddressModal: React.FC<{
  hasIMTR: boolean;
  matomoTrackEvent: Function;
  setActiveState: Function;
  slug: string;
}> = ({ matomoTrackEvent, setActiveState, slug, hasIMTR }) => {
  // @TODO: replace this with React custom hooks
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

    // @TODO: make this working when the custom Hooks are available
    // @TODO: move this to checker.js .reset
    // checker._getAllQuestions().forEach((question: any) => {
    //   question.setAnswer(undefined);
    // });

    return (window.location.href = `/${slug}/vragen-en-conclusie?loadChecker`);
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
                matomoTrackEvent({
                  action: "OPEN MODAL", // @TODO: replace events
                  name: "OPEN MODAL",
                });

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
