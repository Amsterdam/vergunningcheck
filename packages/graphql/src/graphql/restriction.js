const debug = require("debug")("graphql:restrictions");
const cityScape = require("../loaders/cityScape");
const { gql } = require("../util");

const typeDefs = gql`
  union Restriction = Monument | CityScape

  enum Scope {
    NATIONAL
    MUNICIPAL
  }

  extend type Address {
    restrictions: [Restriction!]!
  }
`;

const resolvers = {
  Address: {
    restrictions: (
      { _adressableObjectId },
      _,
      { loaders: { bag, monument, geoSearch } }
    ) => {
      // debug(`query bag.${type.toLowerCase()} id=${_adressableObjectId}`);
      debug(`query bag.accomodation id=${_adressableObjectId}`);
      //   debug(
      //     `using bagSearch._adressableObjectId we find BAG object by querying its @href`
      //   );
      //   debug(`fetch json`, href);
      //   debug(`from result get 'hoofdadres.landelijk_id'`);
      // api.data.amsterdam.nl/monumenten/situeringen/?betreft_nummeraanduiding=0363200012062152
      //   https: hoort_bij_monument._links.self.href;
      // api.data.amsterdam.nl/monumenten/monumenten/aef46aca-843e-44a5-b772-6a6d6490bb21/

      return Promise.all([
        bag.accommodation
          .load(_adressableObjectId)
          .then((acc) => monument.situation.load([acc.mainAddressNationalId]))
          .then((situations) => {
            const situation = situations.shift();

            debug("first situation", situation);
            if (situation && situation.monumentId) {
              return monument.monument.load(situation.monumentId);
            }
            return [];
            // throw new Error("not found ??");
          }),
        bag.accommodation
          .load(_adressableObjectId)
          .then(({ lat, lon }) => {
            debug(
              `got lat/lon ${lat}/${lon} from bag.accomodation. Query geo-search`
            );
            return geoSearch.load(`${lat} ${lon}`);
          })
          .then((matches) => {
            return matches.map(async (match) => {
              const { id, ...data } = match;
              const cityScapeDetails = await (await cityScape.load([id]))[0];
              return {
                ...data,
                ...cityScapeDetails,
              };
            });
          })
          .then((data) => data || []),
      ]).then((results) => results.flat());
    },
  },
  Restriction: {
    __resolveType: ({ _type }) => _type,
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
