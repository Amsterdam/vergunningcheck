import { Heading } from "@datapunt/asc-ui";
import React from "react";
import { isIE, isMobile } from "react-device-detect";

import { HideForPrint, PrintButton } from "../../atoms";
import { sections } from "../../config/matomo";
import Markdown from "../Markdown";

const ContactConclusion = ({ contactConclusion, handlePrintButton }) => {
  return (
    <>
      <Heading forwardedAs="h2">{contactConclusion.title}</Heading>
      <Markdown
        eventLocation={sections.CONCLUSION}
        source={contactConclusion.description}
      />
      <HideForPrint>
        {!isIE && !isMobile && (
          <PrintButton
            variant="textButton"
            onClick={handlePrintButton}
            marginTop={contactConclusion && 5}
          >
            Conclusie opslaan
          </PrintButton>
        )}
      </HideForPrint>
    </>
  );
};
export default ContactConclusion;
