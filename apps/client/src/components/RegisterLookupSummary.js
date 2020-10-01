import { Paragraph } from "@datapunt/asc-ui";
import { setTag } from "@sentry/browser";
import React from "react";

import { ComponentWrapper, List, ListItem, TextToEdit } from "../atoms";
import { getRestrictionByTypeName } from "../utils";
import { uniqueFilter } from "../utils";
import {
  LOCATION_RESTRICTION_CITYSCAPE,
  LOCATION_RESTRICTION_MONUMENT,
  LOCATION_ZONING_PLANS,
} from "../utils/test-ids";
import AddressLine from "./AddressLine";
import ChangeAddressModal from "./Location/ChangeAddressModal";

const RegisterLookupSummary = ({
  address,
  compact,
  setActiveState,
  topic: { slug, sttrFile },
}) => {
  const { restrictions, zoningPlans } = address;
  const monument = getRestrictionByTypeName(restrictions, "Monument")?.name;
  const cityScape = getRestrictionByTypeName(restrictions, "CityScape")?.name;
  const zoningPlanNames = zoningPlans
    .map((plan) => plan.name)
    .filter(uniqueFilter); // filter out duplicates (ie "Winkeldiversiteit Centrum" for 1012TK 1a)

  // @TODO: replace when IMTR refactor is merged
  const hasSTTR = !!sttrFile;

  if (monument) {
    setTag("monument", monument);
  }
  if (cityScape) {
    setTag("cityscape", cityScape);
  }

  return (
    <ComponentWrapper marginBottom={sttrFile ? "0" : null}>
      <Paragraph gutterBottom={16}>
        {!compact ? (
          <>
            <TextToEdit>
              <Paragraph strong gutterBottom={0}>
                Ingevoerd adres:
              </Paragraph>
              <AddressLine {...address} />
            </TextToEdit>
            <ChangeAddressModal {...{ hasSTTR, setActiveState, slug }} />
          </>
        ) : (
          <AddressLine {...address} />
        )}
      </Paragraph>
      <Paragraph data-testid={LOCATION_RESTRICTION_MONUMENT} gutterBottom={0}>
        {monument
          ? `Het gebouw is een ${monument.toLowerCase()}.`
          : "Het gebouw is geen monument."}
      </Paragraph>
      <Paragraph
        data-testid={LOCATION_RESTRICTION_CITYSCAPE}
        gutterBottom={hasSTTR ? 0 : 16}
      >
        {cityScape}
      </Paragraph>

      {!hasSTTR && (
        <>
          <Paragraph strong gutterBottom={0}>
            Bestemmingsplannen:
          </Paragraph>
          {zoningPlanNames.length === 0 ? (
            <Paragraph>Geen bestemmingsplannen</Paragraph>
          ) : (
            <List
              data-testid={LOCATION_ZONING_PLANS}
              style={{
                backgroundColor: "inherit",
                marginTop: 10,
                marginBottom: 0,
              }}
              variant="bullet"
            >
              {zoningPlanNames.map((plan) => (
                <ListItem key={plan}>{plan}</ListItem>
              ))}
            </List>
          )}
        </>
      )}
    </ComponentWrapper>
  );
};

export default RegisterLookupSummary;
