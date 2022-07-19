import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

const BusRoute = ({ routeInfo }) => {
  return (
    <button className="my-1 w-full block text-amber-600 focus:outline-none font-medium rounded-lg text-xs md:text-sm w-full px-5 py-2.5 text-center hover:bg-amber-800 focus:ring-amber-800 hover:text-white border border-amber-700">
      <div className="flex">
        <p className="basis-1/12 self-center mr-2">
          {routeInfo.route_short_name}
        </p>
        <p className="flex-1">{routeInfo.trip_headsign}</p>
      </div>
    </button>
  );
};

export default BusRoute;
