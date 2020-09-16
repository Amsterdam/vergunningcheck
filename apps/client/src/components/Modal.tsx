import { Close } from "@datapunt/asc-assets";
import { Button, Divider, Icon, TopBar } from "@datapunt/asc-ui";
import React, { useState } from "react";

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
  buttonText: React.ReactNode;
  buttonVariant: ButtonVariant;
  children: React.ReactNode;
  heading: string;
  onClick?: Function;
};

const Modal: React.FC<ModalProps> = ({
  buttonText,
  buttonVariant = "primary",
  children,
  heading,
  onClick,
}) => {
  const [isOpen, toggleModal] = useState(false);

  const handleClick = () => {
    toggleModal(!isOpen);

    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <Button onClick={handleClick} type="button" variant={buttonVariant}>
        {buttonText}
      </Button>

      <ModalUI
        aria-describedby={heading}
        aria-labelledby={heading}
        onClose={() => {
          toggleModal(!isOpen);
        }}
        open={isOpen}
      >
        <ModalContent>
          <TopBar>
            <ModalHeading forwardedAs="h4">
              {heading}
              <Button
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  toggleModal(!isOpen);
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

          <ModalBlock>{children}</ModalBlock>
        </ModalContent>
      </ModalUI>
    </>
  );
};

export default Modal;
