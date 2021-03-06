import { Paragraph } from "@amsterdam/asc-ui";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { ComponentWrapper, EditButton } from "../../atoms";
import { actions, eventNames, sections } from "../../config/matomo";
import { useChecker, useSlug, useTopicData, useTracking } from "../../hooks";
import { defaultTopicSession } from "../../SessionContext";
import { LOCATION_MODAL_OPEN_BUTTON } from "../../utils/test-ids";
import Modal from "../Modal";

const EditLocationModal: FunctionComponent = () => {
  const { setChecker } = useChecker();
  const slug = useSlug();
  const { setTopicData } = useTopicData();
  const { matomoTrackEvent } = useTracking();
  const { t } = useTranslation();

  const handleOpenModal = () => {
    matomoTrackEvent({
      action: actions.OPEN_MODAL,
      name: eventNames.OPEN_MODAL_EDIT_ADDRESS,
    });
  };

  const handleConfirmButton = () => {
    matomoTrackEvent({
      action: actions.EDIT_ADDRESS,
      name: `${eventNames.EDIT_ADDRESS} - ${eventNames.BACK} ${sections.LOCATION_INPUT}`,
    });

    matomoTrackEvent({
      action: actions.ACTIVE_STEP,
      name: sections.LOCATION_INPUT,
    });

    const newTopicData = {
      ...defaultTopicSession,
      type: slug,
    };

    setTopicData(newTopicData);

    setChecker(undefined);
  };

  return (
    <Modal
      closeButtonText={t("common.no")}
      confirmText={t("common.yes")}
      handleConfirmButton={handleConfirmButton}
      handleOpenModal={handleOpenModal}
      heading={t(
        "location.address.are you sure you want to change the address"
      )}
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
          {t(
            "location.address.are you sure you want to continue with a different address"
          )}
        </Paragraph>
      </ComponentWrapper>
    </Modal>
  );
};

export default EditLocationModal;
