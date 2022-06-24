import React, { useRef } from "react";
import "./JourneyPlannerModal.css";
import { Autocomplete } from "@react-google-maps/api";

const JourneyPlannerModal = (props) => {
  // Duration info for trip
  // const [duration, setDuration] = useState("");

  // References for origin and destination input
  const originRef = useRef("");
  const destinationRef = useRef("");

  const options = {
    componentRestrictions: { country: ["ie"] },
  };

  // Async function to get route based off origin and dest
  const getRoute = async () => {
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
        props.setDirections(results);
        console.log(results);
      } else {
        props.setDirections(null);
      }
    } catch {
      console.log("No results for that journey error");
    }

    // props.setDirections(results);
    // for (var i = 0; i < results.routes.length; i++) {
    //   console.log(results.routes[i]);
    // }

    // console.log(results);

    // setDuration(results.routes[0].legs[0].duration.text);
  };

  // Function to clear route if we need it
  // const clearRoute = () => {
  //   props.setDirections(null);
  //   // setDuration("");
  //   originRef.current.value = "";
  //   destinationRef.current.value = "";
  // };

  return (
    <div>
      <div className="head">
        <h5 className="text-xl font-medium text-white pb-4">
          Plan Your Journey
        </h5>
      </div>
      <div className="form-inputs">
        <label
          htmlFor="start"
          className="block text-sm font-medium text-gray-300 center"
        >
          Start:
        </label>
        <Autocomplete options={options}>
          <input
            name="start"
            className="border text-sm rounded-lg block w-full p-1.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-amber-500 focus:border-amber-500"
            type="text"
            placeholder="origin"
            ref={originRef}
          />
        </Autocomplete>

        <label
          htmlFor="stop"
          className="block text-sm font-medium text-gray-300 center"
        >
          Stop:
        </label>
        <Autocomplete options={options}>
          <input
            name="stop"
            className="border text-sm rounded-lg block w-full p-1.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-amber-500 focus:border-amber-500"
            type="text"
            placeholder="destination"
            ref={destinationRef}
          />
        </Autocomplete>
      </div>
      <div className="pt-5 px-2">
        <button
          onClick={() => {
            getRoute();
            // props.setOpenModal(false);
            props.setModalType("directionsOptions");
          }}
          type="submit"
          className="text-amber-600 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center hover:bg-amber-800 focus:ring-amber-800 hover:text-white border border-amber-700"
        >
          Go
        </button>
      </div>
    </div>
  );
};

export default JourneyPlannerModal;
