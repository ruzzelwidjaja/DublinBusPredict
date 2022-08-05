import React, { useState, useEffect, useRef } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import "./App.css";
import Map from "./Components/Map";
import Navbar from "./Components/Navbar";
import Modal from "./Components/Modals/Modal";

// Places lib for maps
const libraries = ["places"];

const App = () => {
  const [resultsReady, setResultsReady] = useState(false);

  // Backend API data
  const [stops, setStops] = useState([]);

  // Modal setting
  const [modalType, setModalType] = useState("CLOSED");

  const [routeOptions, setRouteOptions] = useState();

  // Route index chosen
  const [chosenIndex, setChosenIndex] = useState();

  // References for origin and destination input
  const originRef = useRef("");
  const destinationRef = useRef("");

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

  // Function to get predicted journey time for bus leg
  async function getPrediction(id, dist) {
    // Either returns a predicted value or a null result on failure
    let base = "http://localhost:8000/api/prediction/";
    let api_url = base + id + "/" + dist + "/";
    const response = await fetch(api_url);
    if (response.ok) {
      const data = await response.json();
      const prediction = await data.journey_time;
      return prediction;
    } else {
      return null;
    }
  }

  // Function to convert duration (in seconds) to human readable text
  const secondsToText = (sec) => {
    let hr = Math.floor(sec/3600);
    let min = Math.floor(sec%3600 /60);
    let seconds = Math.floor(sec%3600%60);
    if (seconds >= 30) {
      min += 1;
    }
    if (hr > 0) {
      return hr + " hr " + min + " min";
    } else {
      return min + " min";
    }
  }

// View for route options, will decide how button looks
const prepareRouteOptions = async (option) => {
  setResultsReady(false);
  let options;
  options = option.map(async (route, index) => {
    // Arrays for instructions and bus numbers
    let instructionsArray = [];
    let busesArray = [];
    let originalStepDurations = 0; // (total route duration) - sum(original step durations) = (wait time)
    let predictedStepDurations = 0; // for walking, add duration directly, for transit get predicted duration

    // Loop through each step and fill the arrays with instruction and bus info
    const promises = route.legs[0].steps.map(async (step) => {
      let predictedStepDurations = 0;
      instructionsArray.push(step.instructions);
      let stepTravelMode = step.travel_mode;
      originalStepDurations += step.duration.value; // summing original setp durations
      // predictedStepDurations += step.duration.value;

      // If the step involves taking the bus
      if (stepTravelMode === "TRANSIT") {
        let line = step.transit.line;
        let bus_type = line.agencies[0].name;
        let lineID = line.short_name;
        let stepDistance = step.distance.value;

        // Prepare the result if it is a bus we use
        if (bus_type === "Go-Ahead" || bus_type === "Dublin Bus") {
          busesArray.push(line.short_name);
        }

        // Getting prediction for step
        let predictedStepDuration = await getPrediction(lineID, stepDistance);
        if (predictedStepDuration != null) {
          // if value is returned, use value
          predictedStepDurations += predictedStepDuration;
        } else {
          // if no value is returned, use original step duration
          predictedStepDurations += step.duration.value;
        }
      } else {
        predictedStepDurations += step.duration.value; // take non-transit values directly
      }
      return predictedStepDurations;
    });

    const promiseFixer = await Promise.all(promises);
    console.log("promise fixer", promiseFixer);
    let predictedJourneyTime = 0;
    for (let i = 0; i < promiseFixer.length; i++) {
      predictedJourneyTime += promiseFixer[i];
    }
    let waitTime = route.legs[0].duration.value - originalStepDurations; // janky solution, could be improved
    // let predictedJourneyTime = predictedStepDurations + waitTime;
    let durationText = secondsToText(predictedJourneyTime);
    console.log("predicted: " + durationText);
    console.log("original: " + route.legs[0].duration.text);

    return {
      id: index,
      instructions: instructionsArray,
      buses: busesArray,
      distance: route.legs[0].distance.text,
      duration: durationText,
      steps: route.legs[0].steps.length,
    };
  // });
  }).then(setRouteOptions(options)).then(setResultsReady(true));
  // setRouteOptions(options);
  // setResultsReady(true);
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
      transitOptions: { modes: ["BUS"] },
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
  const fetchData = async () => {
    const response = await fetch("http://localhost:8000/api/stops/");
    const data = await response.json();

    // Set stop data
    setStops(data);
  };

  // Get API data
  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div>
      <div id="mapCanvas">
        {modalType !== "CLOSED" && (
          <Modal
            resultsReady={resultsReady}
            modalType={modalType}
            setModalType={setModalType}
            originRef={originRef}
            destinationRef={destinationRef}
            getRoutes={getRoutes}
            routeOptions={routeOptions}
            selectRoute={selectRoute}
            chosenIndex={chosenIndex}
            directionsOutput={directionsOutput}
          />
        )}
        <Map
          setModalType={setModalType}
          chosenIndex={chosenIndex}
          directionsOutput={directionsOutput}
          isLoaded={isLoaded}
          loadError={loadError}
        />
      </div>
      <div id="navbar">
        <Navbar modalType={modalType} setModalType={setModalType} />
      </div>
    </div>
  );
};

export default App;
