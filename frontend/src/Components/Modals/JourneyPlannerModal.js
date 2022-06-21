import React, { useRef } from "react";
import "./JourneyPlannerModal.css";
import { Autocomplete } from "@react-google-maps/api";

const JourneyPlannerModal = (props) => {
  // Duration info for trip
  // const [duration, setDuration] = useState("");

  // References for origin and destination input
  const originRef = useRef("");
  const destinationRef = useRef("");

  // Async function to get route based off origin and dest
  const getRoute = async () => {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }

    // Use google maps js directions service
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
      // eslint-disable-next-line no-undef
      // transitMode: google.maps.TransitMode.BUS,
    });
    props.setDirections(results);
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
        <Autocomplete>
          <input
            name="start"
            className="border text-sm rounded-lg block w-full p-1.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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
        <Autocomplete>
          <input
            name="stop"
            className="border text-sm rounded-lg block w-full p-1.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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
            props.setOpenModal(false);
            props.setModalType("none");
          }}
          type="submit"
          className="text-white focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
        >
          Go
        </button>
      </div>
    </div>
  );
};

export default JourneyPlannerModal;
