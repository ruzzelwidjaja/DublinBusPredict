import React, { useState, useEffect } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import ReactLoading from "react-loading";
import "./App.css";
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

  // Directions
  const [directions, setDirections] = useState(null);

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
    return (
      <div className="absolute h-full w-full bg-zinc-900 ">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <ReactLoading type={"spin"} color="#475569" />
        </div>
        <div className="text-center absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <p className="text-slate-500">Loading..</p>
        </div>
      </div>
    );
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
          />
        )}
        <Map
          stops={stops}
          directions={directions}
          setOpenModal={setOpenModal}
          setModalType={setModalType}
          routeIndex={routeIndex}
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
