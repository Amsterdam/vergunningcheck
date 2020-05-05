const { withCache, fetchJson, getUrl } = require("../../util");
const {
  bagSearch: config,
  CACHE_TIMEOUT,
  HOST,
} = require("config").loaders.datapunt;
const TTL = config.cacheTimeout || CACHE_TIMEOUT;
const URL = `${HOST}${config.url}`;

// houseNumber formatting:
// - houseNumberFull 20 A 1
// - houseNumber 20
// - houseNumberLetter A
// - houseNumberSuffix 1
//
// phrased differently:
// - houseNumberFull = `${houseNumber} ${houseNumberLetter} ${houseNumberSuffix}`

const propFilterUnique = (prop) => (obj, index, self) =>
  self.findIndex((item) => item[prop] === obj[prop]) === index;

const loader = {
  reducer: (o) => ({
    _adressableObjectId: o.adresseerbaar_object_id,
    streetName: o.straatnaam,
    houseNumberFull: o.toevoeging,
    houseNumber: o.huisnummer,
    houseNumberLetter: o.bag_huisletter || null,
    houseNumberSuffix: o.bag_toevoeging || null,
    postalCode: o.postcode,
    residence: o.woonplaats,
    type: o.subtype === "ligplaats" ? "BERTH" : "BUILDING",
  }),
  load: (q) =>
    fetchJson(getUrl(`${URL}search/adres/`, { q })).then((data) => {
      return (
        data.results
          .map(loader.reducer)
          // filter unique values (sometimes there are duplicate values for postalCode + houseNumberFull
          .filter(propFilterUnique("houseNumberFull"))
          // filter addresses that don't have a postalCode (like a metro-station)
          .filter((address) => !!address.postalCode)
      );
    }),
  cached: (key) => withCache(`atlas:${key}`, () => loader.load(key), TTL),
};

module.exports = {
  load: async (keys) => keys.map(loader.cached),
};
