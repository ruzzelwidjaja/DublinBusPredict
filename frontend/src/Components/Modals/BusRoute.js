import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

const BusRoute = ({ routeInfo, setShapes }) => {
  const fetchShapeData = async (id) => {
    const shapeResponse = await fetch(`http://localhost:8000/api/${id}`);
    const shapeData = await shapeResponse.json();

    // Clean the data
    shapeData.forEach((item, index) => {
      item["lat"] = item["shape_pt_lat"];
      item["lng"] = item["shape_pt_lon"];

      delete item.shape_id;
      delete item.shape_pt_sequence;
      delete item.shape_dist_traveled;

      delete item.shape_pt_lat;
      delete item.shape_pt_lon;
    });

    setShapes(shapeData);
  };

  return (
    <button
      className="my-1 w-full block text-amber-600 focus:outline-none font-medium rounded-lg text-xs md:text-sm w-full px-5 py-2.5 text-center hover:bg-amber-800 focus:ring-amber-800 hover:text-white border border-amber-700"
      onClick={() => {
        // Make API call for shape_id
        fetchShapeData(routeInfo.shape_id);
      }}
    >
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
