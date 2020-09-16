import { themeSpacing } from "@datapunt/asc-ui";
import React from "react";
import styled from "styled-components";

const TextToEditStyle = styled.span`
  margin-right: ${themeSpacing(5)};
`;

const TextToEdit: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
}) => <TextToEditStyle>{children}</TextToEditStyle>;

export default TextToEdit;
