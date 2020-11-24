import "leaflet/dist/leaflet.css";

import { Map, Marker, Popup, TileLayer } from "@amsterdam/react-maps";
import React from "react";

const LocationMap = () => {
  const markerPosition = {
    lat: 52.3731081,
    lng: 4.8932945,
  };
  return (
    <>
      <Map
        style={{
          width: "100%",
          height: "400px",
        }}
        options={{
          center: [52.3731081, 4.8932945],
          zoom: 16,
          maxBounds: [
            [52.25168, 4.64034],
            [52.50536, 5.10737],
          ],
        }}
      >
        <Marker args={[markerPosition]}>
          <Popup>test</Popup>
        </Marker>
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
