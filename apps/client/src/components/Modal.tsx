import { Close } from "@datapunt/asc-assets";
import {
  Button,
  CompactThemeProvider,
  Divider,
  Icon,
  TopBar,
  themeSpacing,
} from "@datapunt/asc-ui";
import React, { useState } from "react";
import styled from "styled-components";

import { MODAL, MODAL_BUTTON, MODAL_CLOSE } from "../utils/test-ids";
import { ModalBlock, ModalContent, ModalHeading, ModalUI } from "./ModalStyles";

// Copied from ASC-UI - unfortunately we cannot import these props yet
type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "primaryInverted"
  | "textButton"
  | "blank"
  | "application";

type ModalProps = {
  buttonVariant?: ButtonVariant;
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

const ModalFooterButtons = styled.div`
  padding: ${themeSpacing(2)} 0 ${themeSpacing(1)};

  button {
    margin-right: ${themeSpacing(3)};
  }
`;

const Modal: React.FC<ModalProps> = ({
  buttonVariant = "primary",
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
        variant={buttonVariant}
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
                  variant="primary"
                  onClick={() => {
                    handleConfirmButton && handleConfirmButton();
                    closeModalAfterConfirm && toggleModal(false);
                  }}
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
