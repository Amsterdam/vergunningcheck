import { Button } from "@datapunt/asc-ui";
import React from "react";
import styled from "styled-components";

const EditButtonStyle = styled(Button)`
  text-decoration: underline;
  &:disabled {
    text-decoration: underline;
  }
  @media print {
    display: none;
  }
`;

const EditButton: React.FC<
  { disabled: boolean } & React.HTMLAttributes<HTMLElement>
> = ({ disabled, onClick }) => (
  <EditButtonStyle variant="textButton" {...{ onClick, disabled }}>
    Wijzig
  </EditButtonStyle>
);

export default EditButton;
