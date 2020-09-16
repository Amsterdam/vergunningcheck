import { Close } from "@datapunt/asc-assets";
import {
  Modal as BaseModal,
  Button,
  Divider,
  Heading,
  Icon,
  TopBar,
} from "@datapunt/asc-ui";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";

const ModalBlock = styled.div`
  display: block;
  padding: 0 15px;
  margin: 15px 0;
`;

const Modal = ({
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
      <BaseModal
        aria-labelledby={heading}
        aria-describedby={heading}
        open={isOpen}
        onClose={() => {
          toggleModal(!isOpen);
        }}
        style={{ top: "34%" }}
      >
        <div style={{ minHeight: "50vh" }}>
          <TopBar>
            <Heading forwardedAs="h4" style={{ flexGrow: 1 }}>
              {heading}
              <Button
                type="button"
                size={30}
                variant="blank"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleModal(!isOpen);
                }}
              >
                <Icon size={20}>
                  <Close />
                </Icon>
              </Button>
            </Heading>
          </TopBar>
          <Divider />
          <ModalBlock>{children}</ModalBlock>
        </div>
      </BaseModal>
    </>
  );
};

Modal.propTypes = {
  modalText: PropTypes.string,
};

export default Modal;
