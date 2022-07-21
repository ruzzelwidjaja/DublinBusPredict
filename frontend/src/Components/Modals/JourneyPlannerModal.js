import React from "react";
import { Autocomplete } from "@react-google-maps/api";
import useCollapse from "react-collapsed";
import DateTimePicker from "react-datetime-picker";
import "react-datetime/css/react-datetime.css";
import "./JourneyPlannerModal.css";

const JourneyPlannerModal = ({
  originRef,
  destinationRef,
  getRoutes,
  setModalType,
  setShapes,
  setTimeValue,
  timeValue,
}) => {
  // Autocomplete options
  const options = {
    componentRestrictions: { country: ["ie"] },
  };
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  console.log(timeValue);
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

        <div>
          <button
            {...getToggleProps()}
            className="text-amber-600 focus:outline-none font-xs rounded-lg text-xs md:text-sm w-full text-left pt-2 focus:ring-amber-800 hover:text-amber-400"
          >
            Plan for Later? &ensp;
            {isExpanded ? "-" : "\u23F0"}
          </button>
          <section {...getCollapseProps()}>
            <div className="flex-auto">
              <DateTimePicker
                onChange={setTimeValue}
                value={timeValue}
                disableClock={true}
                disableCalendar={true}
                className="border text-xs md:text-sm rounded-lg block w-full p-1.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-amber-500 focus:border-amber-500"
                format="dd/MM/yyyy h:mm:ss a"
              />
            </div>
          </section>
        </div>
      </div>

      <div className="pt-3 px-2">
        <button
          onClick={() => {
            getRoutes();
            setModalType("chooseRoutes");
            setShapes(null);
            console.log(timeValue);
          }}
          className="text-amber-600 focus:outline-none font-medium rounded-lg text-xs md:text-sm w-full px-5 py-2.5 text-center hover:bg-amber-800 focus:ring-amber-800 hover:text-white border border-amber-700"
        >
          Go
        </button>
      </div>
    </div>
  );
};

export default JourneyPlannerModal;
