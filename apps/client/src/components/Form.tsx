import React from "react";

import { StyledForm } from "./FormStyles";

export type FormProps = {
  className?: string;
  onSubmit?: Function;
};

const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  ...otherProps
  // otherProps could be: className, data-id or data-testid
}) => {
  return (
    <StyledForm
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit) {
          onSubmit(e);
        }
      }}
      {...otherProps}
    >
      {children}
    </StyledForm>
  );
};

export default Form;
