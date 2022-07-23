import React from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  Polyline,
  Marker,
} from "@react-google-maps/api";
import MapStyles from "./MapStyles";

const center = { lat: 53.3434634, lng: -6.2749724 };
const mapContainerStyle = { width: "100%", height: "100%" };
const options = {
  styles: MapStyles,
  disableDefaultUI: true,
  clickableIcons: false,
};

const Map = ({
  setModalType,
  chosenIndex,
  directionsOutput,
  shapes,
  mapLoaded,
  setMapLoaded,
}) => {
  // Function to select route index
  const selectRouteIndex = () => {
    // Choose 0 unless another index specified
    if (chosenIndex) {
      return parseInt(chosenIndex);
    }
    return 0;
  };

  return (
    <>
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

        {shapes && (
          <>
            <Polyline
              options={{
                strokeColor: "#fbbf24",
                strokeOpacity: 0.8,
                strokeWeight: 2,
              }}
              path={shapes}
            />
            <Marker position={shapes[0]} />
            <Marker position={shapes[shapes.length - 1]} />
          </>
        )}
      </GoogleMap>
    </>

  );
};

export default Map;
