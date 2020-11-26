import "leaflet/dist/leaflet.css";

import {
  MarkerClusterGroup,
  createClusterMarkers,
} from "@amsterdam/arm-cluster";
import { BaseLayer, Map, ViewerContainer, Zoom } from "@amsterdam/arm-core";
import React, { useState } from "react";

// import MarkerFilters from "./MarkerFilters";
import markers from "./markers.json";
import ResultsPanel, { Overlay } from "./ResultsPanel";

const LocationMap = () => {
  const [currentOverlay, setCurrentOverlay] = useState<Overlay>(Overlay.None);

  return (
    <>
      <Map fullScreen style={{ height: "600px" }}>
        <ResultsPanel
          currentOverlay={currentOverlay}
          panelTitle="Legenda"
          panelSubTitle="Een kaartpaneel"
          setCurrentOverlay={setCurrentOverlay}
        />
        <ViewerContainer
          bottomRight={<Zoom />}
          // bottomLeft={
          //   <MarkerFilters
          //     // markersSource={markers}
          //     clusterComponent={(markersFiltered) => (
          //       <MarkerClusterGroup markers={markersFiltered} />
          //     )}
          //   />
          // }
        />
        <MarkerClusterGroup
          markers={createClusterMarkers({
            markers,
            events: {
              click: () => {
                console.log("set overlay");
                setCurrentOverlay(Overlay.Results);
              },
            },
          })}
        />
        <BaseLayer />
      </Map>
    </>
  );
};

export default LocationMap;
