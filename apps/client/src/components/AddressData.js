import React from "react";
import { Paragraph } from "@datapunt/asc-ui";
import { getRestrictionByTypeName } from "../utils";
import { List, ListItem } from "../atoms";
import { uniqueFilter } from "../utils";
import { StyledAddressData } from "./AddressDataStyles";

const AddressData = ({ address, displayZoningPlans }) => {
  const { restrictions, zoningPlans } = address;
  const monument = getRestrictionByTypeName(restrictions, "Monument")?.name;
  const cityScape = getRestrictionByTypeName(restrictions, "CityScape")?.name;
  const zoningPlanNames = zoningPlans
    .map((plan) => plan.name)
    .filter(uniqueFilter); // filter out duplicates (ie "Winkeldiversiteit Centrum" for 1012TK 1a)

  return (
    <StyledAddressData>
      <Paragraph strong style={{ marginBottom: "0px" }}>
        Monument:
      </Paragraph>
      <Paragraph>
        {monument ? `Ja. ${monument}` : "Nee. Geen monument"}
      </Paragraph>

      <Paragraph strong style={{ marginBottom: "0px" }}>
        Beschermd stads- of dorpsgezicht:
      </Paragraph>
      <Paragraph>
        {cityScape
          ? `Ja. Het gebouw ligt in een beschermd stads- of dorpsgezicht.`
          : `Nee. Het gebouw ligt niet in een beschermd stads- of dorpsgezicht.`}
      </Paragraph>

      {displayZoningPlans && (
        <>
          <Paragraph strong style={{ marginBottom: "0px" }}>
            Bestemmingsplannen:
          </Paragraph>
          {zoningPlanNames.length === 0 ? (
            <Paragraph>Geen bestemmingsplan</Paragraph>
          ) : (
            <List
              variant="bullet"
              style={{
                backgroundColor: "inherit",
                marginTop: 10,
                marginBottom: 0,
              }}
            >
              {zoningPlanNames.map((plan) => (
                <ListItem key={plan}>{plan}</ListItem>
              ))}
            </List>
          )}
        </>
      )}
    </StyledAddressData>
  );
};

export default AddressData;
