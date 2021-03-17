import React, { FunctionComponent, HTMLAttributes } from "react";
import styled from "styled-components";

type FormProps = {
  dataId?: string;
  dataTestId?: string;
};

const StyledForm = styled.form`
  width: 100%;
  /* IE11 Fix */
  flex-shrink: 0;
`;

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
