import React, { useState } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  Polyline,
} from "@react-google-maps/api";
import "./Map.css";
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
  routeCoords,
}) => {
  const [map, setMap] = useState(null);
  return (
    <GoogleMap
      center={center}
      zoom={14}
      mapContainerStyle={mapContainerStyle}
      options={options}
      onLoad={(map) => {
        setMap(map);
      }}
      onClick={() => {
        setModalType("none");
        setOpenModal(false);
      }}
    >
      {routeCoords && (
        <Polyline
          path={routeCoords}
          geodesic={false}
          options={{
            strokeColor: "#38B44F",
            strokeOpacity: 1,
            strokeWeight: 7,
          }}
        />
      )}
      {/* {directions && routeIndex !== null && (
        <DirectionsRenderer directions={directions} routeIndex={routeIndex} />
      )} */}

      {/* Log the bus number and stop names */}
      {/* {directions &&
        console.log(
          "Bus:",
          directions.routes[0].legs[0].steps[1].transit.line.short_name
        )} */}
      {/* {directions &&
        console.log(
          "Depart from",
          directions.routes[0].legs[0].steps[1].transit.departure_stop.name
        )} */}

      {/* {directions &&
        console.log(
          "Get off after:",
          directions.routes[0].legs[0].steps[1].transit.num_stops
        )} */}
    </GoogleMap>
  );
};

export default Map;
