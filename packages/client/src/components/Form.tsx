import React from "react";

import { StyledForm } from "./FormStyles";

type FormProps = {
  dataId?: string;
  dataTestId?: string;
};

const Form: React.FC<FormProps & React.HTMLAttributes<HTMLElement>> = ({
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
  >
    {children}
  </StyledForm>
);

export default Form;
