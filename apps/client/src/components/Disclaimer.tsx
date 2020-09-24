import { Alert, Paragraph } from "@datapunt/asc-ui";
import React from "react";

import { DISCLAIMER_TEXT } from "../utils/test-ids";
import ContactSentence from "./ContactSentence";

const Disclaimer: React.FC = () => (
  <Alert heading="Let op">
    <Paragraph data-testid={DISCLAIMER_TEXT}>
      De vergunningcheck is nog in ontwikkeling. Hierdoor kunnen wij nog geen
      zekerheid bieden dat de uitkomst correct is. Ook is de informatie nog niet
      voor iedereen goed te lezen of te beluisteren. Wilt u iets zeker weten of
      wilt u meer informatie?{" "}
      <ContactSentence
        eventName=""
        link={false}
        openingSentence={"Bel dan de gemeente op"}
      />
    </Paragraph>
  </Alert>
);

export default Disclaimer;
