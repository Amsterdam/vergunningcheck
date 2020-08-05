import { Paragraph } from "@datapunt/asc-ui";
import React, { useContext } from "react";

import { generateOloUrl } from "../../config";
import { SessionContext } from "../../context";
import { ADDRESS_PAGE } from "../../utils/test-ids";
import Form from "../Form";
import Nav from "../Nav";
import RegisterLookupSummary from "../RegisterLookupSummary";

const Address = ({ topic, setFinishedState, setActiveState, isFinished }) => {
  const sessionContext = useContext(SessionContext);
  const address = sessionContext[topic.slug].address || {};
  const useSTTR = !!topic.sttrFile;

  const onSubmit = (e) => {
    e.preventDefault();
    if (useSTTR) {
      setFinishedState("address", true);
      setActiveState("questions");
    } else {
      window.open(generateOloUrl(address), "_blank");
    }
  };

  return (
    <Form onSubmit={onSubmit} data-testid={ADDRESS_PAGE}>
      <RegisterLookupSummary
        displayZoningPlans={!useSTTR}
        address={address}
        setActiveState={setActiveState}
        setFinishedState={setFinishedState}
        topic={topic}
      />
      <Paragraph gutterBottom={useSTTR && topic.text?.addressPage ? null : 0}>
        {useSTTR
          ? // STTR Flow text (text we need to discuss because it's not in new design)
            `We gebruiken deze informatie bij het invullen van de
              vergunningcheck.`
          : // OLO Flow text
            ` U hebt deze informatie nodig om de vergunningcheck te doen op
              het Omgevingsloket.`}
      </Paragraph>

      {/* Extra text about this activity (text that can be in both flows) */}
      {/* This is also text we need to discuss because it's not in new design */}
      {topic.text?.addressPage && (
        <Paragraph gutterBottom={0}>{topic.text.addressPage}</Paragraph>
      )}

      {!isFinished("address") && (
        <Nav
          onGoToPrev={() => {
            setActiveState("location");
          }}
          nextText={!useSTTR ? "Naar het omgevingsloket" : "Naar de Vragen"}
          formEnds={!useSTTR}
          showPrev
          showNext
        />
      )}
    </Form>
  );
};
export default Address;
