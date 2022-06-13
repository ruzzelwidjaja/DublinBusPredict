import "./App.css";
import React from "react";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";

const center = { lat: 48.8584, lng: 2.2945 };

const App = () => {
  // Variable to check if map api has loaded
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_G00GLE_MAPS_API_KEY,
  });

  // If map has not loaded display loading..
  if (!isLoaded) {
    return <>Loading</>;
  }

  return (
    <div>
      {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "600px" }}
      ></GoogleMap>
    </div>
  );
};

export default App;
