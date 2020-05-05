const { gql } = require("../util");

const typeDefs = gql`
  enum MonumentType {
    """
    A national monument.
    [More info on monumenten.nl](https://www.monumenten.nl/soorten-monumenten/rijksmonument)
    """
    NATIONAL_MONUMENT

    # """
    # A provincial monument.
    # [More info on monumenten.nl](https://www.monumenten.nl/soorten-monumenten/provinciaal-monument)
    # """
    # # not implemented yet # PROVINCIAL_MONUMENT

    """
    A municipal monument.
    [More info on monumenten.nl](https://www.monumenten.nl/soorten-monumenten/gemeentelijk-monument)
    """
    MUNICIPAL_MONUMENT
  }

  type Monument {
    type: MonumentType!
    name: String!
  }
`;

const resolvers = {};

module.exports = {
  typeDefs,
  resolvers,
};
