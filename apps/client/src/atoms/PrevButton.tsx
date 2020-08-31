import { Button, themeSpacing } from "@datapunt/asc-ui";
import React, { ReactNode } from "react";
import styled from "styled-components";

import { PREV_BUTTON } from "../utils/test-ids";

const PrevButtonStyle = styled(Button)`
  margin-left: ${themeSpacing(2)};
  align-self: center;
`;

const PrevButton: React.FC<
  { children: ReactNode } & React.HTMLAttributes<HTMLElement>
> = ({ children, onClick }) => (
  <PrevButtonStyle
    data-testid={PREV_BUTTON}
    type="button"
    variant="textButton"
    {...{ onClick }}
  >
    {children}
  </PrevButtonStyle>
);

export default PrevButton;
