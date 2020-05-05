const { withCache, postXml } = require("../../util");
const config = require("config").loaders.zoningPlan;
const _ = require("lodash");
const TTL = config.cacheTimeout;

const getPostBody = (lat, lon) => `
  <GetFeature
    version="2.0.0"
    service="WFS"
    xmlns="http://www.opengis.net/wfs/2.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:gml="http://www.opengis.net/gml"
    xsi:schemaLocation="http://www.opengis.net/wfs
  http://schemas.opengis.net/wfs/2.0/wfs.xsd">
    <Query typeNames="app:Plangebied_PCP" xmlns:app="http://www.deegree.org/app">
      <PropertyName>app:planstatus</PropertyName>
      <PropertyName>app:naam</PropertyName>
      <fes:Filter xmlns:fes="http://www.opengis.net/fes/2.0">
        <fes:And>
          <fes:DWithin>
            <gml:Point gml:id="P1" srsName="urn:ogc:def:crs:EPSG::28992">
              <gml:pos>${lat} ${lon}</gml:pos>
            </gml:Point>
            <fes:Distance uom="m">1</fes:Distance>
          </fes:DWithin>
          <fes:Or>
            <fes:PropertyIsEqualTo>
              <fes:ValueReference>app:planstatus</fes:ValueReference>
              <fes:Literal>vastgesteld</fes:Literal>
            </fes:PropertyIsEqualTo>
            <fes:PropertyIsEqualTo>
              <fes:ValueReference>app:planstatus</fes:ValueReference>
              <fes:Literal>onherroepelijk</fes:Literal>
            </fes:PropertyIsEqualTo>
          </fes:Or>
        </fes:And>
      </fes:Filter>
    </Query>
    <Query typeNames="app:Bestemmingsplangebied" xmlns:app="http://www.deegree.org/app">
      <PropertyName>app:planstatus</PropertyName>
      <PropertyName>app:naam</PropertyName>
      <fes:Filter xmlns:fes="http://www.opengis.net/fes/2.0">
        <fes:And>
          <fes:DWithin>
            <gml:Point gml:id="P1" srsName="urn:ogc:def:crs:EPSG::28992">
              <gml:pos>${lat} ${lon}</gml:pos>
            </gml:Point>
            <fes:Distance uom="m">1</fes:Distance>
          </fes:DWithin>
          <fes:Or>
            <fes:PropertyIsEqualTo>
              <fes:ValueReference>app:planstatus</fes:ValueReference>
              <fes:Literal>vastgesteld</fes:Literal>
            </fes:PropertyIsEqualTo>
            <fes:PropertyIsEqualTo>
              <fes:ValueReference>app:planstatus</fes:ValueReference>
              <fes:Literal>onherroepelijk</fes:Literal>
            </fes:PropertyIsEqualTo>
          </fes:Or>
        </fes:And>
      </fes:Filter>
    </Query>
  </GetFeature>`;

const loader = {
  reducer: (o) =>
    o["wfs:FeatureCollection"]["wfs:member"]
      // .filter(item => !!item["app:Bestemmingsplangebied"])
      .map((plans) => ({
        name: _.get(Object.values(plans).pop(), "0.app:naam.0"),
      })),
  load: (key) =>
    postXml(config.url, getPostBody(...key.split(" "))).then(loader.reducer),
  cached: (key) => withCache(`zoningPlan:${key}`, () => loader.load(key), TTL),
};

module.exports = {
  load: async (keys) => keys.map(loader.cached),
};
