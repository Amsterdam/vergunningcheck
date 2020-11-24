import "leaflet/dist/leaflet.css";

import {
  Map,
  Marker,
  Popup,
  Rectangle,
  TileLayer,
} from "@amsterdam/react-maps";
import L from "leaflet";
import React, { useEffect, useState } from "react";

const LocationMap = () => {
  const [markerInstance, setMarkerInstance] = useState<L.Marker>();
  const markerPosition = {
    lat: 52.3731081,
    lng: 4.8932945,
  };
  // const [map, setMap] = useState<L.Map>();

  useEffect(() => {
    if (markerInstance) {
      markerInstance.setLatLng(markerPosition);
    }
  }, [markerPosition]);

  return (
    <>
      <Map
        events={{
          zoomend: () => {
            // eslint-disable-next-line no-console
            console.log("zoomend");
          },
          click: () => {
            // eslint-disable-next-line no-console
            console.log("click");
          },
        }}
        style={{
          width: "100%",
          height: "100vh",
        }}
        options={{
          center: [52.3731081, 4.8932945],
          zoom: 16,
          maxBounds: [
            [52.25168, 4.64034],
            [52.50536, 5.10737],
          ],
        }}
        // setInstance={setMap}
      >
        <Marker setInstance={setMarkerInstance} args={[markerPosition]} />
        <Popup
          customAdd={(popup, mapInstance) => {
            return popup
              .setLatLng([52.3731081, 4.8932945])
              .setContent("<p>Hello world!<br />This is a nice popup.</p>")
              .openOn(mapInstance);
          }}
        />
        <Rectangle
          args={[
            [
              [52.3731081, 4.8932945],
              [52.4731081, 4.9932945],
            ],
          ]}
          options={{ color: "#ff7800", weight: 1 }}
        />
        <TileLayer
          options={{
            attribution:
              '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          }}
          args={["http://{s}.tile.osm.org/{z}/{x}/{y}.png"]}
          events={{
            load: () => console.log("loaded"),
          }}
        />
      </Map>
    </>
  );
};

export default LocationMap;
