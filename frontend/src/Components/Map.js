import React from "react";
import { GoogleMap } from "@react-google-maps/api";
import "./Map.css";

const center = { lat: 53.35014, lng: -6.266155 };
const mapContainerStyle = { width: "100%", height: "100%" };

const Map = () => {
  return (
    <GoogleMap
      center={center}
      zoom={13}
      mapContainerStyle={mapContainerStyle}
    ></GoogleMap>
  );
};

export default Map;
