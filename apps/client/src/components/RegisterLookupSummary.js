import { Paragraph } from "@datapunt/asc-ui";
import { setTag } from "@sentry/browser";
import React from "react";

import {
  ComponentWrapper,
  EditButton,
  List,
  ListItem,
  TextToEdit,
} from "../atoms";
import { actions, eventNames, sections } from "../config/matomo";
import { getRestrictionByTypeName } from "../utils";
import { uniqueFilter } from "../utils";
import {
  LOCATION_RESTRICTION_CITYSCAPE,
  LOCATION_RESTRICTION_MONUMENT,
  LOCATION_ZONING_PLANS,
} from "../utils/test-ids";
import AddressLine from "./AddressLine";

const RegisterLookupSummary = ({
  address,
  compact,
  displayZoningPlans,
  matomoTrackEvent,
  setActiveState,
  topic: { sttrFile },
}) => {
  const { restrictions, zoningPlans } = address;
  const monument = getRestrictionByTypeName(restrictions, "Monument")?.name;
  const cityScape = getRestrictionByTypeName(restrictions, "CityScape")?.name;
  const zoningPlanNames = zoningPlans
    .map((plan) => plan.name)
    .filter(uniqueFilter); // filter out duplicates (ie "Winkeldiversiteit Centrum" for 1012TK 1a)

  if (monument) {
    setTag("monument", monument);
  }
  if (cityScape) {
    setTag("cityscape", cityScape);
  }

  return (
    <ComponentWrapper marginBottom={sttrFile ? "0" : null}>
      <Paragraph gutterBottom={16}>
        {!compact ?
          <>
          <TextToEdit>
            <Paragraph strong gutterBottom={0}>Ingevoerd adres:</Paragraph>
            <AddressLine {...address} />
          </TextToEdit>
          <EditButton
            onClick={() => {
              matomoTrackEvent({
                action: actions.CLICK_INTERNAL_NAVIGATION,
                name: eventNames.EDIT_ADDRESS,
              });
              setActiveState(sections.LOCATION_INPUT);
            }}
          />
          </>
          : <AddressLine {...address} />
        }

      </Paragraph>
      <Paragraph data-testid={LOCATION_RESTRICTION_MONUMENT} gutterBottom={0}>
        {monument
          ? `Het gebouw is een ${monument.toLowerCase()}.`
          : "Het gebouw is geen monument."}
      </Paragraph>
      <Paragraph
        data-testid={LOCATION_RESTRICTION_CITYSCAPE}
        gutterBottom={displayZoningPlans ? 16 : 0}
      >
        {cityScape}
      </Paragraph>

      {displayZoningPlans && (
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
