import { MenuButton } from "@amsterdam/asc-ui";
import ReactPDF, { Document, Page } from "@react-pdf/renderer";
import React, { FunctionComponent } from "react";

import IntroPage from "./IntroPage";

const Pdf: FunctionComponent = () => (
  <Document>
    <Page size="A4">
      <IntroPage />
    </Page>
  </Document>
);

export default (
  <MenuButton
    onClick={() => ReactPDF.render(<Pdf />, `${__dirname}/example.pdf`)}
  >
    test
  </MenuButton>
);
