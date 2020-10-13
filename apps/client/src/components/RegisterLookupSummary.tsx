import { Paragraph, themeColor, themeSpacing } from "@amsterdam/asc-ui";
import { setTag } from "@sentry/browser";
import React, { useContext } from "react";
import styled, { css } from "styled-components";

import { ComponentWrapper, List, ListItem } from "../atoms";
import { SessionContext, SessionDataType } from "../context";
import { getRestrictionByTypeName } from "../utils";
import { uniqueFilter } from "../utils";
import {
  LOCATION_RESTRICTION_CITYSCAPE,
  LOCATION_RESTRICTION_MONUMENT,
  LOCATION_SUMMARY,
  LOCATION_ZONING_PLANS,
} from "../utils/test-ids";
import AddressLines from "./AddressLines";
import EditLocationModal from "./Location/EditLocationModal";

type zoningPlanProps = {
  name: string;
};

type RegisterLookupSummaryProps = {
  addressFromLocation?: any;
  isBelowInputFields?: boolean;
  matomoTrackEvent?: Function;
  resetChecker?: Function;
  setActiveState?: Function;
  showEditLocationModal?: boolean;
  showTitle?: boolean;
  topic: any; // @TODO: Replace it with IMTR-Client's TopicType
};

const StyledList = styled(List)<{
  isBelowInputFields?: boolean;
  noMarginBottom?: boolean;
}>`
  /* Disable the margin-bottom to make the list appear nice */
  ${({ noMarginBottom }) =>
    noMarginBottom &&
    css`
      margin-bottom: ${themeSpacing(0)};
    `}

  /* In case List isBelowInputFields make it appear white, instead of black */
  ${({ isBelowInputFields }) =>
    isBelowInputFields &&
    css`
      li {
        color: ${themeColor()};
        &:before {
          background-color: ${themeColor()};
        }
      }
    `}
`;

const StyledListItem = styled(ListItem)`
  margin-bottom: ${themeSpacing(0)};
  left: ${themeSpacing(1)};
`;

const RegisterLookupSummary: React.FC<RegisterLookupSummaryProps> = ({
  addressFromLocation,
  isBelowInputFields,
  resetChecker,
  showEditLocationModal,
  showTitle,
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

  const showSummary = monument || cityScape || !hasIMTR;

  return (
    <ComponentWrapper marginBottom={hasIMTR && 4}>
      <AddressLines
        {...address}
        editAddressRenderer={() =>
          showEditLocationModal && (
            <EditLocationModal {...{ resetChecker, slug }} />
          )
        }
        gutterBottom={showSummary ? 16 : 0}
      />

      {showTitle && showSummary && (
        <Paragraph gutterBottom={8} strong>
          Over dit adres hebben we de volgende gegevens gevonden:
        </Paragraph>
      )}

      {showSummary && (
        <StyledList
          compactThemeSpacing={isBelowInputFields}
          data-testid={LOCATION_SUMMARY}
          isBelowInputFields={isBelowInputFields}
          noMarginBottom={isBelowInputFields || hasIMTR}
          noPadding
          variant="bullet"
        >
          {(monument || showSummary) && (
            <StyledListItem data-testid={LOCATION_RESTRICTION_MONUMENT}>
              {monument
                ? `Het gebouw is een ${monument.toLowerCase()}.`
                : "Het gebouw is geen monument."}
            </StyledListItem>
          )}
          {(cityScape || showSummary) && (
            <StyledListItem data-testid={LOCATION_RESTRICTION_CITYSCAPE}>
              {cityScape
                ? `Het gebouw ligt in een ${
                    cityScape === "NATIONAL"
                      ? "rijksbeschermd"
                      : "gemeentelijk beschermd"
                  } stads- of dorpsgezicht.`
                : `Het gebouw ligt niet in een beschermd stads- of dorpsgezicht.`}
            </StyledListItem>
          )}
        </StyledList>
      )}

      {!hasIMTR && !isBelowInputFields && (
        <>
          <Paragraph gutterBottom={8} strong>
            Bestemmingsplannen:
          </Paragraph>
          {zoningPlanNames.length === 0 ? (
            <Paragraph>Geen bestemmingsplannen</Paragraph>
          ) : (
            <StyledList
              data-testid={LOCATION_ZONING_PLANS}
              noPadding
              variant="bullet"
            >
              {zoningPlanNames.map((planName: string) => (
                <StyledListItem key={planName}>{planName}</StyledListItem>
              ))}
            </StyledList>
          )}
        </>
      )}
    </ComponentWrapper>
  );
};

export default RegisterLookupSummary;
