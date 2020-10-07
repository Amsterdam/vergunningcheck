import React from "react";

import { StyledForm } from "./FormStyles";

export type FormProps = {
  dataId?: string;
  dataTestId?: string;
  onSubmit?: Function;
};

const Form: React.FC<FormProps & React.HTMLAttributes<HTMLElement>> = ({
  children,
  className,
  dataId,
  dataTestId,
  onSubmit,
}) => {
  return (
    <StyledForm
      className={className}
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
};

export default Form;