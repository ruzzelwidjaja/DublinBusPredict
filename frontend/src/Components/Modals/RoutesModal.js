import React from "react";
import BusRoute from "./BusRoute";

const RoutesModal = ({ nameHeadsign }) => {
  return (
    <div>
      <h5 className="text-xl font-medium text-white pb-1">Bus Routes</h5>
      {nameHeadsign.map((routeInfo, index) => (
        <div key={index}>
          <BusRoute routeInfo={routeInfo} />
        </div>
      ))}
    </div>
  );
};

export default RoutesModal;
