import React from "react";
import { Paragraph } from "@datapunt/asc-ui";
import AddressResult from "./AddressResult";
import { getRestrictionByTypeName } from "../utils";
import { List, ListItem } from "../atoms";
import { uniqueFilter } from "../utils";

const AddressData = ({ address, displayZoningPlans }) => {
  const { restrictions, zoningPlans } = address;
  const monument = getRestrictionByTypeName(restrictions, "Monument")?.name;
  const cityScape = getRestrictionByTypeName(restrictions, "CityScape")?.name;
  const zoningPlanNames = zoningPlans
    .map((plan) => plan.name)
    .filter(uniqueFilter); // filter out duplicates (ie "Winkeldiversiteit Centrum" for 1012TK 1a)

  return (
    <div>
      <AddressResult title="Monument:">
        <Paragraph>
          {monument ? `Ja. ${monument}` : "Nee. Geen monument"}
        </Paragraph>
      </AddressResult>

      <AddressResult title="Beschermd stads- of dorpsgezicht:">
        {cityScape ? (
          <Paragraph>
            Ja. Het gebouw ligt in een beschermd stads- of dorpsgezicht.
          </Paragraph>
        ) : (
          <Paragraph>
            Nee. Het gebouw ligt niet in een beschermd stads- of dorpsgezicht.
          </Paragraph>
        )}
      </AddressResult>

      {displayZoningPlans && (
        <AddressResult title="Bestemmingsplannen:">
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
        </AddressResult>
      )}
    </div>
  );
};

export default AddressData;
