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

const Map = ({ directions, setOpenModal, setModalType, routeIndex, route }) => {
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
      {route &&
        route.map((step, stepIndex) => (
          <Polyline
            geodesic={false}
            path={step.stepCoords}
            options={{
              strokeColor: step.stepTravelMode === "WALKING" ? "blue" : "red",
              strokeOpacity: 0.8,
              strokeWeight: 4,
            }}
          />
        ))}
    </GoogleMap>
  );
};

export default Map;
