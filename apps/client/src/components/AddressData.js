import React from "react";
import { Paragraph } from "@datapunt/asc-ui";
import AddressResult from "./AddressResult";
import { List, ListItem } from "../components/Atoms";

const getRestrictionByTypeName = (address, typeName) =>
  address.restrictions.find(({ __typename }) => __typename === typeName);

const AddressData = ({ address }) => {
  const monument = getRestrictionByTypeName(address, "Monument")?.name;
  const cityScape = getRestrictionByTypeName(address, "CityScape")?.name;
  const zoningPlans = address.zoningPlans.map((plan) => plan.name);

  return (
    <div>
      <AddressResult title="Monument:">
        <Paragraph>{monument ? `Ja. ${monument}` : "Geen monument"}</Paragraph>
      </AddressResult>

      <AddressResult title="Beschermd stads- of dorpsgezicht:">
        {cityScape ? (
          <Paragraph>
            Ja. Het gebouw ligt in een beschermd stads- of dorpsgezicht.
          </Paragraph>
        ) : (
          <Paragraph>
            Wij kunnen op dit moment niet uit ons systeem halen of het gebouw in
            een beschermd stads- of dorpsgezicht ligt. Controleer dit zelf op de{" "}
            <a
              href="https://maps.amsterdam.nl/cultuurhistorie/?LANG=nl&amp;L=6,7,8,9,10&amp;T=2"
              rel="noopener noreferrer"
              target="_blank"
            >
              Cultuurhistorische waardenkaart op Amsterdam Maps
            </a>
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
