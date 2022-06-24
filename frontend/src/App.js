import "./App.css";
import React, { useState, useEffect } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import Map from "./Components/Map";
import Navbar from "./Components/Navbar";
import Modal from "./Components/Modals/Modal";

const libraries = ["places"];

const App = () => {
  // Declare initial state for stop data
  const [stops, setStops] = useState([]);
  const [routeIndex, setRouteIndex] = useState(null);

  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("none");

  // Directions and coords
  const [directions, setDirections] = useState(null);
  const [routeCoords, setRouteCoords] = useState(null);

  // Function to get data from backend API
  const fetchData = async () => {
    const response = await fetch("http://localhost:8000/api/stops/");
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
    return <>Loading...</>;
  }

  return (
    <div>
      <div id="mapCanvas">
        {openModal && (
          <Modal
            modalType={modalType}
            setOpenModal={setOpenModal}
            setModalType={setModalType}
            setDirections={setDirections}
            directions={directions}
            setRouteIndex={setRouteIndex}
            setRouteCoords={setRouteCoords}
          />
        )}
        <Map
          stops={stops}
          directions={directions}
          setOpenModal={setOpenModal}
          setModalType={setModalType}
          routeIndex={routeIndex}
          routeCoords={routeCoords}
        />
      </div>
      <div id="navbar">
        <Navbar
          setOpenModal={setOpenModal}
          openModal={openModal}
          modalType={modalType}
          setModalType={setModalType}
        />
      </div>
    </div>
  );
};

export default App;
