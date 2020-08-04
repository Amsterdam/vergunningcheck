import { Button, Paragraph } from "@datapunt/asc-ui";
import React from "react";

import { ComponentWrapper, List, ListItem } from "../atoms";
import { getRestrictionByTypeName } from "../utils";
import { uniqueFilter } from "../utils";
import AddressLine from "./AddressLine";

const RegisterLookupSummary = ({
  address,
  displayZoningPlans,
  setActiveState,
  setFinishedState,
}) => {
  const { restrictions, zoningPlans } = address;
  const monument = getRestrictionByTypeName(restrictions, "Monument")?.name;
  const cityScape = getRestrictionByTypeName(restrictions, "CityScape")?.name;
  const zoningPlanNames = zoningPlans
    .map((plan) => plan.name)
    .filter(uniqueFilter); // filter out duplicates (ie "Winkeldiversiteit Centrum" for 1012TK 1a)

  return (
    <ComponentWrapper>
      <Paragraph strong gutterBottom={0}>
        Gekozen adres:
      </Paragraph>
      <Paragraph>
        <AddressLine address={address} />
        <Button
          variant="textButton"
          style={{ marginLeft: 12 }}
          onClick={() => {
            setActiveState("location");
            setFinishedState(["address", "questions", "conclusion"], false);
          }}
          type="button"
        >
          Wijzig
        </Button>
      </Paragraph>
      <Paragraph strong gutterBottom={0}>
        Monument:
      </Paragraph>
      <Paragraph>
        {monument ? `Ja. ${monument}.` : "Nee. Geen monument."}
      </Paragraph>

      <Paragraph strong gutterBottom={0}>
        Beschermd stads- of dorpsgezicht:
      </Paragraph>
      <Paragraph gutterBottom={displayZoningPlans ? null : 0}>
        {cityScape
          ? `Ja. Het gebouw ligt in een beschermd stads- of dorpsgezicht.`
          : `Nee. Het gebouw ligt niet in een beschermd stads- of dorpsgezicht.`}
      </Paragraph>

      {displayZoningPlans && (
        <>
          <Paragraph strong gutterBottom={0}>
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
    </ComponentWrapper>
  );
};

export default RegisterLookupSummary;
