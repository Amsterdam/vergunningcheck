import { Checkmark } from "@amsterdam/asc-assets";
import React from "react";
import styled from "styled-components";

type CheckboxProps = {
  checked: boolean;
};

type HiddenCheckboxProps = {
  checked: boolean;
  onChange: (target: any) => void;
};

export const CheckboxContainer = styled.div`
  margin: 10px 0 20px 0;
`;

export const CheckboxLabel = styled.span`
  margin-left: 8px;

  @media (max-width: 380px) {
    font-size: 12px;
  }
`;

const CheckboxWrapper = styled.div`
  display: inline-block;

  vertical-align: middle;
`;

const HiddenCheckbox = styled.input.attrs({
  type: "checkbox",
})<HiddenCheckboxProps>`
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;

  white-space: nowrap;

  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  overflow: hidden;

  position: absolute;
`;

const StyledCheckbox = styled.div<CheckboxProps>`
  display: inline-block;
  width: 22px;
  height: 22px;

  border: 1px solid #a8a8a8;

  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px #0146996e;
  }
`;

const StyledMark = styled(Checkmark)<CheckboxProps>`
  width: 20px;
  height: 20px;
  display: ${({ checked }) => (checked ? "block" : "none")};
`;

interface ICheckboxProps {
  checked: boolean;
  onChange: (target: any) => void;
  props?: any;
  [key: string]: any;
}

const StyledCheckboxComponent = ({
  checked,
  onChange,
  ...props
}: ICheckboxProps) => (
  <CheckboxWrapper>
    <HiddenCheckbox checked={checked} onChange={onChange} {...props} />
    <StyledCheckbox checked={checked}>
      <StyledMark checked={checked} />
    </StyledCheckbox>
  </CheckboxWrapper>
);

export default StyledCheckboxComponent;
