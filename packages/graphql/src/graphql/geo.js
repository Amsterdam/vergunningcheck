const { gql } = require("../util");

const typeDefs = gql`
  # A (multidimensional) set of coordinates following x, y, z order
  scalar GeoJSONCoordinates

  # Arbitrary JSON value
  scalar JSONObject

  # Enumeration of all GeoJSON object types
  enum GeoJSONType {
    Point
    MultiPoint
    LineString
    MultiLineString
    Polygon
    MultiPolygon
    GeometryCollection
    Feature
    FeatureCollection
  }

  # enum GeoJSONCRSType {
  #   NAME
  #   LINK
  # }

  interface GeoJSONInterface {
    type: GeoJSONType!
    # crs: GeoJSONCoordinateReferenceSystem!
    bbox: [Float]
  }

  interface GeoJSONGeometryInterface {
    type: GeoJSONType!
    # crs: GeoJSONCoordinateReferenceSystem!
    bbox: [Float]
    coordinates: GeoJSONCoordinates
  }

  input GeoSearchInput {
    type: GeoJSONType!
    coordinates: GeoJSONCoordinates
  }

  # union GeoJSONCRSProperties =
  #     GeoJSONNamedCRSProperties
  #   | GeoJSONLinkedCRSProperties

  # type GeoJSONNamedCRSProperties {
  #   name: String!
  # }

  # type GeoJSONLinkedCRSProperties {
  #   href: String!
  #   type: String
  # }

  # type GeoJSONCoordinateReferenceSystem {
  #   type: GeoJSONCRSType!
  #   properties: GeoJSONCRSProperties!
  # }

  type GeoJSONPoint implements GeoJSONGeometryInterface & GeoJSONInterface {
    type: GeoJSONType!
    # crs: GeoJSONCoordinateReferenceSystem!
    bbox: [Float]
    coordinates: GeoJSONCoordinates
  }

  type GeoJSONMultiPoint implements GeoJSONInterface & GeoJSONGeometryInterface {
    type: GeoJSONType!
    # crs: GeoJSONCoordinateReferenceSystem!
    bbox: [Float]
    coordinates: GeoJSONCoordinates
  }

  type GeoJSONLineString implements GeoJSONInterface & GeoJSONGeometryInterface {
    type: GeoJSONType!
    # crs: GeoJSONCoordinateReferenceSystem!
    bbox: [Float]
    coordinates: GeoJSONCoordinates
  }

  type GeoJSONMultiLineString implements GeoJSONInterface & GeoJSONGeometryInterface {
    type: GeoJSONType!
    # crs: GeoJSONCoordinateReferenceSystem!
    bbox: [Float]
    coordinates: GeoJSONCoordinates
  }

  type GeoJSONPolygon implements GeoJSONInterface & GeoJSONGeometryInterface {
    type: GeoJSONType!
    # crs: GeoJSONCoordinateReferenceSystem!
    bbox: [Float]
    coordinates: GeoJSONCoordinates
  }

  type GeoJSONMultiPolygon implements GeoJSONInterface & GeoJSONGeometryInterface {
    type: GeoJSONType!
    # crs: GeoJSONCoordinateReferenceSystem!
    bbox: [Float]
    coordinates: GeoJSONCoordinates
  }

  type GeoJSONFeature implements GeoJSONInterface {
    type: GeoJSONType!
    # crs: GeoJSONCoordinateReferenceSystem!
    bbox: [Float]
    geometry: GeoJSONGeometryInterface
    properties: JSONObject
    # id: String
  }

  type GeoJSONFeatureCollection implements GeoJSONInterface {
    type: GeoJSONType!
    # crs: GeoJSONCoordinateReferenceSystem!
    bbox: [Float]
    features: [GeoJSONFeature!]!
  }

  type GeoJSONGeometryCollection implements GeoJSONInterface {
    type: GeoJSONType!
    # crs: GeoJSONCoordinateReferenceSystem!
    bbox: [Float]
    geometries: [GeoJSONGeometryInterface!]!
  }
`;

const resolvers = {};

module.exports = {
  typeDefs,
  resolvers,
};
