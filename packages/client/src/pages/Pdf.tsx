import { Document, PDFViewer, Page } from "@react-pdf/renderer";
import React from "react";

import CheckerPage from "./CheckerPage";

// Create Document Component
const Pdf: React.FC = () => (
  <PDFViewer>
    <Document>
      <Page size="A4">
        <CheckerPage />
      </Page>
    </Document>
  </PDFViewer>
);

export default Pdf;
