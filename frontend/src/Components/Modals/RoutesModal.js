import React from "react";
import BusRoute from "./BusRoute";

const RoutesModal = ({
  nameHeadsign,
  setShapes,
  setDirectionsOutput,
  mapLoaded,
}) => {
  if (nameHeadsign.length === 0) {
    return (
      <div>
        <p className="text-xs md:text-base rounded-lg block w-full p-1.5 text-white">
          Sorry, no route information could be found.
          <br /> Please try again later.
        </p>
      </div>
    );
  }
  return (
    <div>
      <h5 className="text-xl font-medium text-white pb-1">Bus Routes</h5>
      {nameHeadsign.map((routeInfo, index) => (
        <div key={index}>
          <BusRoute
            routeInfo={routeInfo}
            setShapes={setShapes}
            setDirectionsOutput={setDirectionsOutput}
            mapLoaded={mapLoaded}
          />
        </div>
      ))}
    </div>
  );
};

export default RoutesModal;
