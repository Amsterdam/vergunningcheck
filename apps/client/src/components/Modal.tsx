import { Close } from "@datapunt/asc-assets";
import {
  Button,
  CompactThemeProvider,
  Divider,
  Icon,
  TopBar,
} from "@datapunt/asc-ui";
import React, { useState } from "react";

import { MODAL, MODAL_BUTTON, MODAL_CLOSE } from "../utils/test-ids";
import {
  ModalBlock,
  ModalContent,
  ModalFooterButtons,
  ModalHeading,
  ModalUI,
} from "./ModalStyles";

type ModalProps = {
  children: React.ReactNode;
  closeButtonText?: string;
  closeModalAfterConfirm?: boolean;
  confirmText?: string;
  handleConfirmButton?: Function;
  handleOpenModal?: Function;
  heading: string;
  onClick?: Function;
  openButtonText: React.ReactNode;
  showCloseButton?: boolean;
  showConfirmButton?: boolean;
};

const Modal: React.FC<ModalProps> = ({
  children,
  closeButtonText = "Sluiten",
  closeModalAfterConfirm = true,
  confirmText = "Bevestig",
  handleConfirmButton,
  handleOpenModal,
  heading,
  openButtonText,
  showCloseButton = true,
  showConfirmButton,
}) => {
  const [open, toggleModal] = useState(false);

  const openModal = () => {
    toggleModal(true);

    if (handleOpenModal) {
      handleOpenModal();
    }
  };

  return (
    <>
      <Button
        data-testid={MODAL_BUTTON}
        onClick={openModal}
        type="button"
        variant="primary"
      >
        {openButtonText}
      </Button>

      <ModalUI
        aria-describedby={heading}
        aria-labelledby={heading}
        data-testid={MODAL}
        onClose={() => {
          toggleModal(false);
        }}
        open={open}
      >
        <ModalContent>
          <TopBar>
            <ModalHeading forwardedAs="h4">
              {heading}
              <Button
                data-testid={MODAL_CLOSE}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  toggleModal(false);
                }}
                size={30}
                type="button"
                variant="blank"
              >
                <Icon size={20}>
                  <Close />
                </Icon>
              </Button>
            </ModalHeading>
          </TopBar>

          <Divider />

          <ModalBlock>
            <CompactThemeProvider>{children}</CompactThemeProvider>

            <ModalFooterButtons>
              {showConfirmButton && (
                <Button
                  onClick={() => {
                    handleConfirmButton && handleConfirmButton();
                    closeModalAfterConfirm && toggleModal(false);
                  }}
                  variant="primary"
                >
                  {confirmText}
                </Button>
              )}
              {showCloseButton && (
                <Button
                  onClick={() => toggleModal(false)}
                  variant="primaryInverted"
                >
                  {closeButtonText}
                </Button>
              )}
            </ModalFooterButtons>
          </ModalBlock>
        </ModalContent>
      </ModalUI>
    </>
  );
};

export default Modal;
