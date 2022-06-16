import "./App.css";
import React, { useState, useEffect } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import Map from "./Components/Map";
import Navbar from "./Components/Navbar";

const libraries = [];

const App = () => {
  // Declare initial state for stop data
  const [stops, setStops] = useState([]);

  // Function to get data from backend API
  const fetchData = async () => {
    const response = await fetch("http://localhost:8000/api/dublinbusstops/");
    const data = await response.json();

    // Set stop data
    setStops(data);
  };

  // Get API data
  useEffect(() => {
    fetchData();
  }, []);

  // Variable to check if map api has loaded
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // Error loading Map
  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  // If map has not loaded display loading..
  if (!isLoaded) {
    return <>Loading</>;
  }
  return (
    <div>
      <div id="mapCanvas">
        <Map stops={stops} />
      </div>
      <div id="navbar">
        <Navbar />
      </div>
    </div>
  );
};

export default App;
