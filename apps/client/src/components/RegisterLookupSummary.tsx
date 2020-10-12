import { Paragraph } from "@amsterdam/asc-ui";
import { setTag } from "@sentry/browser";
import React, { useContext } from "react";
import styled from "styled-components";

import { ComponentWrapper, List, ListItem } from "../atoms";
import { SessionContext, SessionDataType } from "../context";
import { getRestrictionByTypeName } from "../utils";
import { uniqueFilter } from "../utils";
import {
  LOCATION_RESTRICTION_CITYSCAPE,
  LOCATION_RESTRICTION_MONUMENT,
  LOCATION_ZONING_PLANS,
} from "../utils/test-ids";
import AddressLines from "./AddressLines";
import EditLocationModal from "./Location/EditLocationModal";

type zoningPlanProps = {
  name: string;
};

type RegisterLookupSummaryProps = {
  addressFromLocation: any;
  compact: boolean;
  matomoTrackEvent?: Function;
  resetChecker?: Function;
  setActiveState?: Function;
  topic: any; // @TODO: Replace it with IMTR-Client's TopicType
};

const StyledList = styled(List)`
  margin-top: 12px;
  margin-bottom: 16px;
  background-color: inherit;
`;

const RegisterLookupSummary: React.FC<RegisterLookupSummaryProps> = ({
  addressFromLocation,
  compact,
  resetChecker,
  topic: { slug, hasIMTR },
}) => {
  // @TODO: replace with custom topic hooks
  const sessionContext = useContext<SessionDataType>(SessionContext);
  const address = addressFromLocation
    ? addressFromLocation
    : sessionContext[slug].address; // @TODO: replace with type Session and/or Address and remove types of zoningPlan below
  const { restrictions, zoningPlans } = address;
  const monument = getRestrictionByTypeName(restrictions, "Monument")?.name;
  const cityScape = getRestrictionByTypeName(restrictions, "CityScape")?.scope;
  const zoningPlanNames = zoningPlans
    .map((plan: zoningPlanProps) => plan.name)
    .filter(uniqueFilter); // filter out duplicates (ie "Winkeldiversiteit Centrum" for 1012TK 1a)

  if (monument) {
    setTag("monument", monument);
  }
  if (cityScape) {
    setTag("cityscape", cityScape);
  }

  return (
    <ComponentWrapper marginBottom={hasIMTR && 4}>
      <AddressLines
        {...address}
        editAddressRenderer={() =>
          hasIMTR && <EditLocationModal {...{ resetChecker, slug }} />
        }
        gutterBottom={monument || cityScape ? 16 : 0}
      />
      {compact && (monument || cityScape) && (
        <Paragraph gutterBottom={8} strong>
          Over dit adres hebben we de volgende gegevens gevonden:
        </Paragraph>
      )}
      {(monument || !hasIMTR) && (
        <Paragraph data-testid={LOCATION_RESTRICTION_MONUMENT} gutterBottom={0}>
          {monument
            ? `Het gebouw is een ${monument.toLowerCase()}.`
            : "Het gebouw is geen monument."}
        </Paragraph>
      )}
      {(cityScape || !hasIMTR) && (
        <Paragraph
          data-testid={LOCATION_RESTRICTION_CITYSCAPE}
          gutterBottom={hasIMTR || compact ? 0 : 16}
        >
          {cityScape
            ? `Het gebouw ligt in een ${
                cityScape === "NATIONAL"
                  ? "rijksbeschermd"
                  : "gemeentelijk beschermd"
              } stads- of dorpsgezicht.`
            : `Het gebouw ligt niet in een beschermd stads- of dorpsgezicht.`}
        </Paragraph>
      )}
      {!hasIMTR && !compact && (
        <>
          <Paragraph strong gutterBottom={0}>
            Bestemmingsplannen:
          </Paragraph>
          {zoningPlanNames.length === 0 ? (
            <Paragraph>Geen bestemmingsplannen</Paragraph>
          ) : (
            <StyledList data-testid={LOCATION_ZONING_PLANS} variant="bullet">
              {zoningPlanNames.map((planName: string) => (
                <ListItem key={planName}>{planName}</ListItem>
              ))}
            </StyledList>
          )}
        </>
      )}
    </ComponentWrapper>
  );
};

export default RegisterLookupSummary;
