import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Divider,
  Heading,
  Icon,
  TopBar,
  Modal as BaseModal,
} from "@datapunt/asc-ui";
import { Close } from "@datapunt/asc-assets";
import styled from "styled-components";
import Markdown from "./Markdown";

const ModalBlock = styled.div`
  display: block;
  padding: 0 15px;
  margin: 15px 0;
`;

const Modal = ({ modalText }) => {
  const [explanationShown, toggleExplanationShown] = useState(false);

  return (
    <div style={{ marginBottom: "24px" }}>
      <Button
        type="button"
        color="primary"
        onClick={() => toggleExplanationShown(!explanationShown)}
      >
        Toelichting
      </Button>
      <BaseModal
        style={{ top: "34%" }}
        aria-labelledby="Toelichting"
        aria-describedby="Toelichting"
        open={explanationShown}
        onClose={() => toggleExplanationShown(!explanationShown)}
      >
        <div style={{ minHeight: "50vh" }}>
          <TopBar>
            <Heading forwardedAs="h4" style={{ flexGrow: 1 }}>
              Toelichting
              <Button type="button" size={30} variant="blank">
                <Icon size={20}>
                  <Close
                    onClick={() => toggleExplanationShown(!explanationShown)}
                  />
                </Icon>
              </Button>
            </Heading>
          </TopBar>
          <Divider />
          <ModalBlock>
            <Markdown source={modalText} />
          </ModalBlock>
        </div>
      </BaseModal>
    </div>
  );
};

Modal.propTypes = {
  modalText: PropTypes.string,
};

export default Modal;
