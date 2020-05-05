import React from "react";
import { useHistory } from "react-router-dom";
import { StyledForm } from "./FormStyles";

const Form = ({ children, onSubmit, action, ...rest }) => {
  const history = useHistory();

  return (
    <StyledForm
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit) {
          onSubmit(e);
        }
        if (action) {
          history.push(action);
        }
      }}
      {...rest}
    >
      {children}
    </StyledForm>
  );
};

export default Form;
