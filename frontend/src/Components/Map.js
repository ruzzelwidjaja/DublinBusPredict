import React, { useState } from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import MapStyles from "./MapStyles";
// import ReactLoading from "react-loading";

const center = { lat: 53.3434634, lng: -6.2749724 };
const mapContainerStyle = { width: "100%", height: "100%" };
const options = {
  styles: MapStyles,
  disableDefaultUI: true,
  clickableIcons: false,
};

const Map = ({ setModalType, chosenIndex, directionsOutput }) => {
  const [mapLoaded, setMapLoaded] = useState(null);

  // Function to select route index
  const selectRouteIndex = () => {
    // Choose 0 unless another index specified
    if (chosenIndex) {
      return parseInt(chosenIndex);
    }
    return 0;
  };

  // Function to pan the map down below route info
  // const panDown = (map, directions) => {
  //   map.panTo(directions);
  //   map.panBy(0, 20);
  // };

  return (
    <GoogleMap
      center={center}
      zoom={14}
      mapContainerStyle={mapContainerStyle}
      options={options}
      onLoad={(mapLoaded) => setMapLoaded(mapLoaded)}
      onClick={() => {
        setModalType("CLOSED");
      }}
    >
      {directionsOutput && (
        <DirectionsRenderer
          options={{
            suppressMarkers: true,
            suppressInfoWindows: true,
            polylineOptions: { strokeColor: "#d97706" },
          }}
          directions={directionsOutput}
          routeIndex={selectRouteIndex()}
        />
      )}
    </GoogleMap>
  );
};

export default Map;
