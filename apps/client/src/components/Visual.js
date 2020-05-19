import React, { useState } from "react";
import { Figure, Img, FigCaption } from "./VisualStyles";
import { Card } from "@datapunt/asc-ui";

export default ({ title, ...rest }) => {
  const [loading, setLoading] = useState(true);
  return (
    <Card isLoading={loading}>
      <Figure>
        <Img {...rest} onLoad={() => setLoading(false)} />
        {title && <FigCaption>{title}</FigCaption>}
      </Figure>
    </Card>
  );
};
