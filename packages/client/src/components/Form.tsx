import React, { FunctionComponent, HTMLAttributes } from "react";

import { StyledForm } from "./FormStyles";

type FormProps = {
  dataId?: string;
  dataTestId?: string;
};

const Form: FunctionComponent<FormProps & HTMLAttributes<HTMLElement>> = ({
  children,
  dataId,
  dataTestId = "form",
  onSubmit,
}) => (
  <StyledForm
    data-id={dataId}
    data-testid={dataTestId}
    onSubmit={(e) => {
      e.preventDefault();
      if (onSubmit) {
        onSubmit(e);
      }
    }}
    role="form"
  >
    {children}
  </StyledForm>
);

export default Form;
