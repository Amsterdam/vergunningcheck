import { Button, Heading, Modal, themeSpacing } from "@amsterdam/asc-ui";
import styled from "styled-components";

export const ModalUI = styled(Modal)`
  top: 34%;
`;

export const ModalBlock = styled.div`
  display: block;
  padding: 0 ${themeSpacing(4)};
  margin: ${themeSpacing(4)} 0;
`;

// This is to prevent bugs with flexbox
export const ModalButton = styled(Button)`
  align-self: flex-start;
`;

export const ModalContent = styled.div`
  min-height: 50vh;
`;

export const ModalHeading = styled(Heading)`
  flex-grow: 1;
`;

export const ModalFooterButtons = styled.div`
  padding: ${themeSpacing(2)} 0 ${themeSpacing(1)};

  button {
    margin-right: ${themeSpacing(3)};
  }
`;
