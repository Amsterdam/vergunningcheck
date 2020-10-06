import { FormTitle as FormTitleComp } from "@amsterdam/asc-ui";
import React, { ReactNode } from "react";
import styled from "styled-components";

// This file should be temporary, since this style overwrite is already fixed in asc-ui
// However, the update contains too many breaking changes to upgrade now
// @TODO: upgrade asc-ui and fix breaking changes
const FormTitleStyle = styled(FormTitleComp)`
  max-width: inherit;
`;

const FormTitle: React.FC<{ children: ReactNode }> = ({
  children,
  ...otherProps
}) => <FormTitleStyle {...otherProps}>{children}</FormTitleStyle>;

export default FormTitle;
