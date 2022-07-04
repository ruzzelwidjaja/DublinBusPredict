import React, { useState } from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import MapStyles from "./MapStyles";
import ReactLoading from "react-loading";

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
  isLoaded,
  loadError,
}) => {
  const [mapLoaded, setMapLoaded] = useState(null);

  // Error loading Map
  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  // If map has not loaded display loading..
  if (!isLoaded) {
    return (
      <div className="h-full w-full bg-zinc-900 ">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <ReactLoading type={"spin"} color="#475569" />
        </div>
        <div className="text-center absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <p className="text-slate-500">Loading..</p>
        </div>
      </div>
    );
  }

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
