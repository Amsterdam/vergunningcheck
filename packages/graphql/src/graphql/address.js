const uniqBy = require("lodash.uniqby");
const debug = require("debug")("graphql:address");
const { gql } = require("../util");
var { GraphQLError } = require("graphql");

let typeDefs = gql`
  type Address implements Node {
    id: ID!
    streetName: String!
    houseNumber: Int!
    houseNumberSuffix: String
    houseNumberFull: String!
    postalCode: String!
    residence: String!
    type: AddressType!
  }
  enum AddressType {
    BERTH
    BUILDING
  }
  type AddressSearch {
    matches: [Address!]!
    exactMatch: Address
  }
  type Query {
    address(id: ID!): Address
    findAddress(
      streetName: String
      postalCode: String
      houseNumberFull: String!
    ): AddressSearch!
  }
`;

if (process.env.NODE_ENV !== "production") {
  typeDefs += gql`
    extend type Address {
      _adressableObjectId: String!
    }
  `;
}
/**
 * Not exactly clear what business requirements are
 * and if this is the best way to implement it.
 */
function getExactMatch(queryHouseNumberFull, addressList) {
  // if no letter or suffix is found, we need an exact match
  const list = getSameHouseNumbers(queryHouseNumberFull, addressList);
  // const queryHouseNumber = getHouseNumberFromHouseNumberFull(
  //   queryHouseNumberFull
  // );
  if (list.length > 1) {
    const first = list[0];
    if (
      first.houseNumber &&
      !first.houseNumberLetter &&
      !first.houseNumberSuffix
    ) {
      const res = list.filter((address) => {
        // debug(
        //   "equal? ",
        //   JSON.stringify(address.houseNumberFull),
        //   JSON.stringify(queryHouseNumber),
        //   address.houseNumberFull === queryHouseNumberFull
        // );
        return address.houseNumberFull === queryHouseNumberFull;
      });
      // debug(
      //   `getExactMatch len was > 1, so from first check if ${first.houseNumber &&
      //     !first.houseNumberLetter &&
      //     !first.houseNumberSuffix}. Output is`,
      //   res,
      //   `Input was ${queryHouseNumberFull}->${queryHouseNumber}`,
      //   "filtered by houseNumber list was",
      //   list
      // );
      return res;
    }
  }

  return addressList.filter(
    (address) =>
      address.houseNumber === Number(queryHouseNumberFull) ||
      address.houseNumberFull === queryHouseNumberFull
  );
}

function getHouseNumberFromHouseNumberFull(queryHouseNumberFull) {
  return Number(queryHouseNumberFull.replace("-", " ").trim().split(" ")[0]);
}

function getSameHouseNumbers(queryHouseNumberFull, addressList) {
  const dataWithoutDuplicates = uniqBy(addressList, "houseNumberFull");
  const queryHouseNumber = getHouseNumberFromHouseNumberFull(
    queryHouseNumberFull
  );

  const res = dataWithoutDuplicates.filter(
    (a) => a.houseNumber === queryHouseNumber
  );
  // debug(`getSameHouseNumbers`, res);
  return res;
  // if (dataWithoutDuplicates[0].huisnummer && !dataWithoutDuplicates[0].bag_toevoeging && !data[0].bag_huisletter) {
  //   return dataWithoutDuplicates.filter(address => address.huisnummer === Number(cleanNumber));
  // }

  // const suffix = `${cleanNumber.replace(/\D/g, '')} ${cleanNumber.replace(/[0-9]/g, '').trim()}`;
  // return dataWithoutDuplicates.filter(
  //   address => address.huisnummer === Number(cleanNumber.replace(/\D/g, '')) || address.toevoeging === `${suffix}`,
  // );
}

const resolve = (args, bagSearch, one) => {
  debug(`find ${one ? "one" : "any"} address`, args);
  const { streetName, postalCode } = args;
  const houseNumberFull = args.houseNumberFull.trim().replace("-", " ");

  if (!streetName && !postalCode) {
    return new GraphQLError("Please provide 'streetName' or 'postalCode'.");
  } else if (streetName && postalCode) {
    return new GraphQLError(
      "Please provide either 'streetName' òr 'postalCode'."
    );
  }
  const key = (postalCode || "") + (streetName || "") + " " + houseNumberFull;

  return bagSearch.load(key).then((addressList) => {
    if (one) {
      const res = getExactMatch(houseNumberFull, addressList);
      // debug(`getExactMatch`, res);
      return res.length === 1
        ? res[0]
        : addressList.length === 1
        ? addressList[0]
        : null;
    }
    return getSameHouseNumbers(houseNumberFull, addressList);
  });
};

const resolvers = {
  AddressSearch: {
    matches: (args, _, { loaders }) => resolve(args, loaders.bagSearch),
    exactMatch: (args, _, { loaders }) =>
      resolve(args, loaders.bagSearch, true),
  },
  Address: {
    id: ({ _adressableObjectId }) =>
      Buffer.from(_adressableObjectId).toString("base64"),
  },
  Query: {
    findAddress: (_, args) => args,
    address: async (_, { id }, { loaders }) => {
      const x = Buffer.from(id, "base64").toString("ascii");
      const res = await loaders.bagSearch.load(x);
      return res[0];
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
