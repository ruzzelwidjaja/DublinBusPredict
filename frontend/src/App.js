import "./App.css";
import React from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import Map from "./Components/Map";
import Navbar from "./Components/Navbar";

const App = () => {
  // Variable to check if map api has loaded
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  // If map has not loaded display loading..
  if (!isLoaded) {
    return <>Loading</>;
  }

  return (
    <div>
      <Map />
      <Navbar />
    </div>
  );
};

export default App;
