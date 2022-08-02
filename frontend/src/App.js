import React, { useState, useEffect, useRef } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import "./App.css";
import Map from "./Components/Map";
import Navbar from "./Components/Navbar";
import Modal from "./Components/Modals/Modal";
import ReactLoading from "react-loading";

// Places lib for maps
const libraries = ["places","geometry"];

const App = () => {
  const [mapLoaded, setMapLoaded] = useState(null);

  // Backend API data
  const [stops, setStops] = useState([]);
  const [nameHeadsign, setNameHeadsign] = useState([]);
  const [shapes, setShapes] = useState([]);

  // Modal setting
  const [modalType, setModalType] = useState("CLOSED");

  // Options for different routes to destination
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
  // Error loading Map
  if (loadError) {
    return (
      <div className="h-full w-full bg-zinc-900 absolute text-base font-light	tracking-wider text-slate-100 font-medium py-3 px-7">
        Google Maps cannot be loaded right now.
        <br />
        Please try again later or contact Google and maybe they can solve the
        issue! :)
      </div>
    );
  } else if (!isLoaded) {
    // If map has not loaded display loading..
    return (
      <div className="h-full w-full bg-zinc-900 absolute">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <ReactLoading type={"spin"} color="#475569" />
        </div>
        <div className="text-center absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <p className="text-slate-500">Loading..</p>
        </div>
      </div>
    );
  }

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
          busesArray.push(line.short_name);
        }
      });

      return {
        id: index,
        remove: route.contains_non_dublin_bus,
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
          }
        }
      });
    });
  };

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
          stops={stops}
        />
      </div>
      <div id="navbar">
        <Navbar modalType={modalType} setModalType={setModalType} />
      </div>
    </div>
  );
};

export default App;
