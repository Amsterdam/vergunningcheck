import React, { useState } from "react";
import { StyledCard, Img, FigCaption } from "./VisualStyles";

export default ({ title, ...rest }) => {
  const [loading, setLoading] = useState(true);
  return (
    <StyledCard isLoading={loading}>
      <Img {...rest} onLoad={() => setLoading(false)} />
      {title && <FigCaption>{title}</FigCaption>}
    </StyledCard>
  );
};
