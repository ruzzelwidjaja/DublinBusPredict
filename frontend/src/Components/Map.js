import React from "react";
import { GoogleMap } from "@react-google-maps/api";
import "./Map.css";

const center = { lat: 48.8584, lng: 2.2945 };

const Map = () => {
  return (
    <div id="mapCanvas">
      {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "100%" }}
      ></GoogleMap>
    </div>
  );
};

export default Map;
