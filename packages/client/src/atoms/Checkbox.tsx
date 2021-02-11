import React, { useState } from "react";

import StyledCheckboxComponent, {
  CheckboxContainer,
  CheckboxLabel,
} from "./CheckboxStyles";

const Checkbox = () => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleCheckboxChange = ({ target }: { target: any }) => {
    setChecked(target.checked);
  };

  return (
    <CheckboxContainer>
      <label>
        <StyledCheckboxComponent
          checked={checked}
          onChange={handleCheckboxChange}
        />
        <CheckboxLabel>De boom staat niet op de kaart</CheckboxLabel>
      </label>
    </CheckboxContainer>
  );
};

export default Checkbox;
