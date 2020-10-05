import { Paragraph } from "@datapunt/asc-ui";
import { setTag } from "@sentry/browser";
import React, { useContext } from "react";

import { ComponentWrapper, List, ListItem } from "../atoms";
import { SessionContext } from "../context";
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
  addressFromLocation,
  compact,
  setActiveState,
  topic: { slug, sttrFile },
}) => {
  const sessionContext = useContext(SessionContext);
  const address = addressFromLocation
    ? addressFromLocation
    : sessionContext[slug].address;
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
      {compact ? (
        <AddressLine {...address} />
      ) : (
        <>
          <Paragraph strong gutterBottom={0}>
            Ingevoerd adres:
          </Paragraph>
          <AddressLine {...address} />
          <ChangeAddressModal {...{ hasSTTR, setActiveState, slug }} />
        </>
      )}
      {(monument || !hasSTTR) && (
        <Paragraph data-testid={LOCATION_RESTRICTION_MONUMENT} gutterBottom={0}>
          {monument
            ? `Het gebouw is een ${monument.toLowerCase()}.`
            : "Het gebouw is geen monument."}
        </Paragraph>
      )}
      {(cityScape || !hasSTTR) && (
        <Paragraph
          data-testid={LOCATION_RESTRICTION_CITYSCAPE}
          gutterBottom={hasSTTR ? 0 : 16}
        >
          {cityScape
            ? `Het gebouw ligt in een beschermd stads- of dorpsgezicht.`
            : `Het gebouw ligt niet in een beschermd stads- of dorpsgezicht.`}
        </Paragraph>
      )}

      {!hasSTTR && !compact && (
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
