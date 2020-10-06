import { Close } from "@amsterdam/asc-assets";
import { CompactThemeProvider, Divider, Icon, TopBar } from "@amsterdam/asc-ui";
import React, { useState } from "react";

import {
  MODAL,
  MODAL_CLOSE_BUTTON,
  MODAL_CONFIRM_BUTTON,
  MODAL_DECLINE_BUTTON,
  MODAL_OPEN_BUTTON,
} from "../utils/test-ids";
import {
  ModalBlock,
  ModalButton,
  ModalContent,
  ModalFooterButtons,
  ModalHeading,
  ModalUI,
} from "./ModalStyles";

// @TODO: import these props from ASC-UI when they added this feature
type buttonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "primaryInverted"
  | "textButton"
  | "blank"
  | "application"
  | undefined;

type ModalProps = {
  children: React.ReactNode;
  closeButtonText?: string;
  closeModalAfterConfirm?: boolean;
  confirmText?: string;
  handleConfirmButton?: Function;
  handleOpenModal?: Function;
  heading: string;
  onClick?: Function;
  openButtonVariant?: buttonVariant;
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
  openButtonVariant = "primary",
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
      <ModalButton
        data-testid={MODAL_OPEN_BUTTON}
        onClick={openModal}
        type="button"
        variant={openButtonVariant}
      >
        {openButtonText}
      </ModalButton>

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
              <ModalButton
                data-testid={MODAL_CLOSE_BUTTON}
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
              </ModalButton>
            </ModalHeading>
          </TopBar>

          <Divider />

          <ModalBlock>
            <CompactThemeProvider>{children}</CompactThemeProvider>

            <ModalFooterButtons>
              {showConfirmButton && (
                <ModalButton
                  data-testid={MODAL_CONFIRM_BUTTON}
                  onClick={() => {
                    handleConfirmButton && handleConfirmButton();
                    closeModalAfterConfirm && toggleModal(false);
                  }}
                  variant="primary"
                >
                  {confirmText}
                </ModalButton>
              )}
              {showCloseButton && (
                <ModalButton
                  data-testid={MODAL_DECLINE_BUTTON}
                  onClick={() => toggleModal(false)}
                  variant="primaryInverted"
                >
                  {closeButtonText}
                </ModalButton>
              )}
            </ModalFooterButtons>
          </ModalBlock>
        </ModalContent>
      </ModalUI>
    </>
  );
};

export default Modal;
