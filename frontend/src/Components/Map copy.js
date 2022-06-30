import React, { useCallback, useRef } from "react";
import { DirectionsRenderer, GoogleMap } from "@react-google-maps/api";
import MapStyles from "./MapStyles";

const center = { lat: 53.3434634, lng: -6.2749724 };
const mapContainerStyle = { width: "100%", height: "100%" };
const options = {
  styles: MapStyles,
  disableDefaultUI: true,
  clickableIcons: false,
};

const Map = ({
  directions,
  setOpenModal,
  setModalType,
  routeIndex,
  setMap,
}) => {
  const getRouteIndex = () => {
    if (routeIndex) {
      return parseInt(routeIndex);
    }
    return 0;
  };
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const mapRef = useRef();
  return (
    <GoogleMap
      center={center}
      zoom={14}
      mapContainerStyle={mapContainerStyle}
      options={options}
      onLoad={onLoad}
      onClick={() => {
        setModalType("none");
        setOpenModal(false);
      }}
    >
      {directions && (
        <DirectionsRenderer
          directions={directions}
          routeIndex={getRouteIndex()}
          options={{
            polylineOptions: {
              zIndex: 50,
              strokeColor: "#1976D2",
              strokeWeight: 5,
            },
          }}
        />
      )}
    </GoogleMap>
  );
};

export default Map;
