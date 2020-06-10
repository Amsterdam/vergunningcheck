import React from "react";
import { Paragraph } from "@datapunt/asc-ui";
import AddressResult from "./AddressResult";
import { List, ListItem } from "../atoms";
import { uniqueFilter } from "../utils";

const getRestrictionByTypeName = (address, typeName) =>
  address.restrictions.find(({ __typename }) => __typename === typeName);

const AddressData = ({ address }) => {
  const monument = getRestrictionByTypeName(address, "Monument")?.name;
  const cityScape = getRestrictionByTypeName(address, "CityScape")?.name;
  const zoningPlans = address.zoningPlans
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

      <AddressResult title="Bestemmingsplannen:">
        {zoningPlans.length === 0 ? (
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
            {zoningPlans.map((plan) => (
              <ListItem key={plan}>{plan}</ListItem>
            ))}
          </List>
        )}
      </AddressResult>
    </div>
  );
};

export default AddressData;
