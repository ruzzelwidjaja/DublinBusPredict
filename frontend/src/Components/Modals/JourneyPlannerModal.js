import React from "react";
import { Autocomplete } from "@react-google-maps/api";
import "./JourneyPlannerModal.css";

const JourneyPlannerModal = ({
  originRef,
  destinationRef,
  getRoutes,
  setModalType,
}) => {
  // Autocomplete options
  const options = {
    componentRestrictions: { country: ["ie"] },
  };

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
            getRoutes();
            setModalType("chooseRoutes");
          }}
          // type="submit"
          className="text-amber-600 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center hover:bg-amber-800 focus:ring-amber-800 hover:text-white border border-amber-700"
        >
          Go
        </button>
        {/* {directionsOutput && (
          <ChooseRouteModal
            chosenIndex={chosenIndex}
            routeOptions={routeOptions}
            selectRoute={selectRoute}
          />
        )} */}
      </div>
    </div>
  );
};

export default JourneyPlannerModal;
