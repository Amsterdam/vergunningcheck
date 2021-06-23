import { Paragraph, themeColor, themeSpacing } from "@amsterdam/asc-ui";
import { setTag } from "@sentry/browser";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";

import { AddressLines, ComponentWrapper, List, ListItem } from "../../atoms";
import { useTopic, useTopicData } from "../../hooks";
import { Address, GraphQLTopic } from "../../types";
import { getRestrictionByTypeName } from "../../utils";
import {
  LOCATION_RESTRICTION_CITYSCAPE,
  LOCATION_RESTRICTION_MONUMENT,
  LOCATION_SUMMARY,
} from "../../utils/test-ids";
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
  const { t } = useTranslation();

  const address = addressFromLocation ?? topicData.address;
  const { restrictions } = address || {};

  if (!topic) {
    return <p>loading...</p>;
  }

  const { hasIMTR } = topic as GraphQLTopic;

  const monument = getRestrictionByTypeName(
    restrictions,
    "Monument"
  )?.name?.toLowerCase();

  const cityScapeScope = getRestrictionByTypeName(restrictions, "CityScape")
    ?.scope;
  const cityScape = cityScapeScope
    ? cityScapeScope === "NATIONAL"
      ? t("common.national city scape")
      : t("common.municipal city scape")
    : "";

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
          {t(
            "common.we have found the following information about this address"
          )}
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
                ? t("common.the building is a monument", { monument })
                : t("common.the building is not a monument")}
            </StyledListItem>
          )}
          {(cityScape || !hasIMTR) && (
            <StyledListItem data-testid={LOCATION_RESTRICTION_CITYSCAPE}>
              {cityScape
                ? t("common.the building is located inside a city scape", {
                    cityScape,
                  })
                : t("common.the building is not located inside a city scape")}
            </StyledListItem>
          )}
        </StyledList>
      )}
    </ComponentWrapper>
  );
};

export default LocationSummary;
