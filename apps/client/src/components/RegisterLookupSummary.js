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
  topic: { sttrFile },
}) => {
  const { restrictions, zoningPlans } = address;
  const monument = getRestrictionByTypeName(restrictions, "Monument")?.name;
  const cityScape = getRestrictionByTypeName(restrictions, "CityScape")?.name;
  const zoningPlanNames = zoningPlans
    .map((plan) => plan.name)
    .filter(uniqueFilter); // filter out duplicates (ie "Winkeldiversiteit Centrum" for 1012TK 1a)

  return (
    <ComponentWrapper marginBottom={sttrFile ? "0" : null}>
      <Paragraph gutterBottom={16}>
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
      <Paragraph gutterBottom={16}>
        Over dit adres hebben we de volgende gegevens gevonden:
      </Paragraph>
      <Paragraph strong gutterBottom={0}>
        Monument:
      </Paragraph>
      <Paragraph gutterBottom={16}>
        {monument
          ? `Het gebouw is een ${monument.toLowerCase()}.`
          : "Het gebouw is geen monument."}
      </Paragraph>

      <Paragraph strong gutterBottom={0}>
        Beschermd stads- of dorpsgezicht:
      </Paragraph>
      <Paragraph gutterBottom={displayZoningPlans ? 16 : 0}>
        {cityScape
          ? `Het gebouw ligt in een beschermd stads- of dorpsgezicht.`
          : `Het gebouw ligt niet in een beschermd stads- of dorpsgezicht.`}
      </Paragraph>

      {displayZoningPlans && (
        <>
          <Paragraph strong gutterBottom={0}>
            Bestemmingsplannen:
          </Paragraph>
          {zoningPlanNames.length === 0 ? (
            <Paragraph>Geen bestemmingsplannen</Paragraph>
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
