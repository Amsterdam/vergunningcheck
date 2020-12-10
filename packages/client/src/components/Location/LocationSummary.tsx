import { Paragraph, themeColor, themeSpacing } from "@amsterdam/asc-ui";
import { setTag } from "@sentry/browser";
import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";

import { ComponentWrapper, List, ListItem } from "../../atoms";
import { useTopic, useTopicData } from "../../hooks";
import { Address } from "../../types";
import { getRestrictionByTypeName } from "../../utils";
import {
  LOCATION_RESTRICTION_CITYSCAPE,
  LOCATION_RESTRICTION_MONUMENT,
  LOCATION_SUMMARY,
} from "../../utils/test-ids";
import AddressLines from "../AddressLines";
import EditLocationModal from "./EditLocationModal";

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

type LocationSummaryProps = {
  addressFromLocation?: Address;
  isBelowInputFields?: boolean;
  showEditLocationModal?: boolean;
  showTitle?: boolean;
};

const LocationSummary: FunctionComponent<LocationSummaryProps> = ({
  addressFromLocation,
  isBelowInputFields,
  showEditLocationModal,
  showTitle,
}) => {
  const topic = useTopic();
  const { topicData } = useTopicData();
  const address = addressFromLocation ?? topicData.address;

  const { restrictions } = address || {};
  const { hasIMTR } = topic;

  const monument = getRestrictionByTypeName(restrictions, "Monument")?.name;
  const cityScape = getRestrictionByTypeName(restrictions, "CityScape")?.scope;

  if (monument) {
    setTag("monument", monument);
  }
  if (cityScape) {
    setTag("cityscape", cityScape);
  }

  const showSummary = !!(monument || cityScape || !hasIMTR);

  return (
    <ComponentWrapper marginBottom={hasIMTR ? 4 : undefined}>
      <AddressLines
        address={address}
        editAddressRenderer={() =>
          showEditLocationModal && <EditLocationModal />
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
