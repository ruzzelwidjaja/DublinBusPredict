import React, { useState, useEffect, useRef } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import "./App.css";
import Map from "./Components/Map";
import Navbar from "./Components/Navbar";
import Modal from "./Components/Modals/Modal";

// Places lib for maps
const libraries = ["places"];

const App = () => {
  const [mapLoaded, setMapLoaded] = useState(null);

  // Backend API data
  const [stops, setStops] = useState([]);
  const [nameHeadsign, setNameHeadsign] = useState([]);
  const [shapes, setShapes] = useState([]);

  // Modal setting
  const [modalType, setModalType] = useState("CLOSED");

  const [routeOptions, setRouteOptions] = useState();

  // Route index chosen
  const [chosenIndex, setChosenIndex] = useState();

  // References for origin and destination input
  const originRef = useRef("");
  const destinationRef = useRef("");

  // Time for journey
  const [timeValue, setTimeValue] = useState(new Date());

  // Directions object from request to google maps
  const [directionsOutput, setDirectionsOutput] = useState(null);

  // Variable to check if map api has loaded
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // Function to take chosen route and set index
  const selectRoute = (selection) => {
    setChosenIndex(selection);
  };

  // View for route options, will decide how button looks
  const prepareRouteOptions = (option) => {
    const options = option.map((route, index) => {
      // Arrays for instructions and bus numbers
      let instructionsArray = [];
      let busesArray = [];

      // Loop through each step and fill the arrays with instruction and bus info
      route.legs[0].steps.forEach((step) => {
        instructionsArray.push(step.instructions);
        let stepTravelMode = step.travel_mode;

        // If the step involves taking the bus
        if (stepTravelMode === "TRANSIT") {
          let line = step.transit.line;
          let bus_type = line.agencies[0].name;

          // Prepare the result if it is a bus we use
          if (bus_type === "Go-Ahead" || bus_type === "Dublin Bus") {
            busesArray.push(line.short_name);
          }
        }
      });

      return {
        id: index,
        instructions: instructionsArray,
        buses: busesArray,
        distance: route.legs[0].distance.text,
        duration: route.legs[0].duration.text,
        steps: route.legs[0].steps.length,
      };
    });
    setRouteOptions(options);
  };

  // Async function to get route based off origin and destination
  const getRoutes = async () => {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }

    // Create google maps js directions service object
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();

    // Declare request format
    const directionsRequest = {
      // Set origin and destination
      origin: originRef.current.value,
      destination: destinationRef.current.value,

      // Specify transit mode and bus as mode of transport
      travelMode: "TRANSIT",
      transitOptions: {
        modes: ["BUS"],
        departureTime: timeValue,
      },
      provideRouteAlternatives: true,
      // eslint-disable-next-line no-undef
      unitSystem: google.maps.UnitSystem.METRIC,
    };

    let directionsAvailable = false;
    // Call route function, passing it a directions request object
    try {
      const results = await directionsService.route(
        directionsRequest,
        function (result, status) {
          if (status === "OK") {
            directionsAvailable = true;
            return;
          }
        }
      );
      if (directionsAvailable) {
        // Clean results for non Dublin bus responses
        console.log(results);
        cleanObject(results);
        prepareRouteOptions(results.routes);
        setDirectionsOutput(results);

        setChosenIndex(0);
      }
    } catch {
      console.log("No results for that journey error");
    }
  };

  // Function to clean directions object for non Dublin Bus results
  const cleanObject = (response) => {
    // Array of route indices to remove from directions response
    let routes_to_remove = [];
    response.routes.forEach((route, index) => {
      // Route index
      let routeIndex = index;

      let legs = route.legs[0];
      let steps = legs.steps;

      steps.forEach((step) => {
        let stepTravelMode = step.travel_mode;

        // If the step involves taking the bus
        if (stepTravelMode === "TRANSIT") {
          let line = step.transit.line;
          let bus_type = line.agencies[0].name;

          // Prepare the result if it is a bus we use
          if (bus_type === "Go-Ahead" || bus_type === "Dublin Bus") {
            response.routes[routeIndex].contains_non_dublin_bus = "NO";
          } else {
            response.routes[routeIndex].contains_non_dublin_bus = "YES";
            routes_to_remove.push(routeIndex);
          }
        }
      });
    });
    // Need to remove these and may also need to get rid of duplicate routes
    console.log("routes to remove: ", routes_to_remove);
  };

  // Function to get data from backend API
  const fetchAPIData = async () => {
    const stopResponse = await fetch("http://localhost:8000/api/stops/");
    const stopData = await stopResponse.json();

    const nameHeadsignResponse = await fetch(
      "http://localhost:8000/api/namesandheadsigns/"
    );
    const nameHeadsignData = await nameHeadsignResponse.json();

    // Set relevant data
    setStops(stopData);
    setNameHeadsign(nameHeadsignData);
  };

  // Get API data
  useEffect(() => {
    fetchAPIData();
  }, []);

  return (
    <div>
      <div id="mapCanvas">
        {modalType !== "CLOSED" && (
          <Modal
            modalType={modalType}
            setModalType={setModalType}
            originRef={originRef}
            destinationRef={destinationRef}
            getRoutes={getRoutes}
            routeOptions={routeOptions}
            selectRoute={selectRoute}
            chosenIndex={chosenIndex}
            directionsOutput={directionsOutput}
            nameHeadsign={nameHeadsign}
            setShapes={setShapes}
            setDirectionsOutput={setDirectionsOutput}
            mapLoaded={mapLoaded}
            timeValue={timeValue}
            setTimeValue={setTimeValue}
          />
        )}
        <Map
          setModalType={setModalType}
          chosenIndex={chosenIndex}
          directionsOutput={directionsOutput}
          isLoaded={isLoaded}
          loadError={loadError}
          shapes={shapes}
          mapLoaded={mapLoaded}
          setMapLoaded={setMapLoaded}
        />
      </div>
      <div id="navbar">
        <Navbar modalType={modalType} setModalType={setModalType} />
      </div>
    </div>
  );
};

export default App;
