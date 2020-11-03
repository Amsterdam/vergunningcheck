import { Paragraph, themeColor, themeSpacing } from "@amsterdam/asc-ui";
import { setTag } from "@sentry/browser";
import React, { useContext } from "react";
import styled, { css } from "styled-components";

import { ComponentWrapper, List, ListItem } from "../../atoms";
import { Topic } from "../../config";
import { SessionContext, SessionDataType } from "../../context";
import { getRestrictionByTypeName } from "../../utils";
import {
  LOCATION_RESTRICTION_CITYSCAPE,
  LOCATION_RESTRICTION_MONUMENT,
  LOCATION_SUMMARY,
} from "../../utils/test-ids";
import AddressLines from "../AddressLines";
import EditLocationModal from "./EditLocationModal";

type LocationSummaryProps = {
  addressFromLocation?: any;
  isBelowInputFields?: boolean;
  resetChecker?: () => void;
  setActiveState?: () => void;
  showEditLocationModal?: boolean;
  showTitle?: boolean;
  topic: Topic; // TODO: Replace with react-hook
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

const LocationSummary: React.FC<LocationSummaryProps> = ({
  addressFromLocation,
  isBelowInputFields,
  resetChecker,
  showEditLocationModal,
  showTitle,
  topic,
}) => {
  // TODO: replace with react hooks
  const { hasIMTR, slug } = topic;
  const sessionContext = useContext<SessionDataType>(SessionContext);
  const address = addressFromLocation
    ? addressFromLocation
    : sessionContext[slug].address; // @TODO: replace with type Session and/or Address
  const { restrictions } = address;
  const monument = getRestrictionByTypeName(restrictions, "Monument")?.name;
  const cityScape = getRestrictionByTypeName(restrictions, "CityScape")?.scope;

  if (monument) {
    setTag("monument", monument);
  }
  if (cityScape) {
    setTag("cityscape", cityScape);
  }

  const showSummary = monument || cityScape || !hasIMTR;

  return (
    <ComponentWrapper marginBottom={hasIMTR ? 4 : undefined}>
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
          {(monument || !hasIMTR) && (
            <StyledListItem data-testid={LOCATION_RESTRICTION_MONUMENT}>
              {monument
                ? `Het gebouw is een ${monument.toLowerCase()}.`
                : "Het gebouw is geen monument."}
            </StyledListItem>
          )}
          {(cityScape || !hasIMTR) && (
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
    </ComponentWrapper>
  );
};

export default LocationSummary;
