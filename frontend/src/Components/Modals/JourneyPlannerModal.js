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
        <h5 className="text-md md:text-xl font-medium text-white pb-2 md:pb-4">
          Plan Your Journey
        </h5>
      </div>
      <div className="form-inputs">
        <div className="flex my-2">
          <label
            htmlFor="start"
            className="block text-left py-2 text-xs md:text-sm font-medium text-gray-300 flex-none w-20"
          >
            Start:
          </label>
          <div className="flex-auto">
            <Autocomplete options={options}>
              <input
                name="start"
                className=" border text-xs md:text-sm rounded-lg block w-full p-1.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-amber-500 focus:border-amber-500"
                type="text"
                placeholder="origin"
                ref={originRef}
              />
            </Autocomplete>
          </div>
        </div>

        <div className="flex">
          <label
            htmlFor="stop"
            className="block py-2 text-left text-xs md:text-sm font-medium text-gray-300 flex-none w-20"
          >
            Stop:
          </label>
          <div className="flex-auto">
            <Autocomplete options={options}>
              <input
                name="stop"
                className="border text-xs md:text-sm rounded-lg block w-full p-1.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-amber-500 focus:border-amber-500"
                type="text"
                placeholder="destination"
                ref={destinationRef}
              />
            </Autocomplete>
          </div>
        </div>
      </div>
      <div className="pt-3 px-2">
        <button
          onClick={() => {
            getRoutes();
            setModalType("chooseRoutes");
          }}
          // type="submit"
          className="text-amber-600 focus:outline-none font-medium rounded-lg text-xs md:text-sm w-full px-5 py-2.5 text-center hover:bg-amber-800 focus:ring-amber-800 hover:text-white border border-amber-700"
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
