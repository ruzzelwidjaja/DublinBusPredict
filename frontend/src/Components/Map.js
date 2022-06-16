import React from "react";
import { GoogleMap } from "@react-google-maps/api";
import "./Map.css";
import MapStyles from "./MapStyles";

const center = { lat: 53.3434634, lng: -6.2749724 };
const mapContainerStyle = { width: "100%", height: "100%" };
const options = {
  styles: MapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = (props) => {
  console.log(props.stops);
  return (
    <GoogleMap
      center={center}
      zoom={14}
      mapContainerStyle={mapContainerStyle}
      options={options}
    ></GoogleMap>
  );
};

export default Map;
