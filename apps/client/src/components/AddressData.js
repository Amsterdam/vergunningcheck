import React from "react";
import { Paragraph } from "@datapunt/asc-ui";
import AddressResult from "./AddressResult";
import { getRestrictionByTypeName } from "../utils";

const AddressData = ({ address }) => {
  const { restrictions } = address;
  const monument = getRestrictionByTypeName(restrictions, "Monument")?.name;
  const cityScape = getRestrictionByTypeName(restrictions, "CityScape")?.name;

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
    </div>
  );
};

export default AddressData;
