import React from "react";

const BusRoute = ({ route }) => {
  return (
    <button className="my-1 w-full block text-amber-600 focus:outline-none font-medium rounded-lg text-xs md:text-sm w-full px-5 py-2.5 text-center hover:bg-amber-800 focus:ring-amber-800 hover:text-white border border-amber-700">
      {route.route_short_name}
    </button>
  );
};

export default BusRoute;
