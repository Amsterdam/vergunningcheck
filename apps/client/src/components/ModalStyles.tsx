import { Heading, Modal } from "@datapunt/asc-ui";
import styled from "styled-components";

export const ModalUI = styled(Modal)`
  top: 34%;
`;

export const ModalBlock = styled.div`
  display: block;
  padding: 0 15px;
  margin: 15px 0;
`;

export const ModalContent = styled.div`
  min-height: 50vh;
`;

export const ModalHeading = styled(Heading)`
  flex-grow: 1;
`;
