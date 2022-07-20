import React from "react";
import BusRoute from "./BusRoute";

const RoutesModal = ({ nameHeadsign, setShapes }) => {
  return (
    <div>
      <h5 className="text-xl font-medium text-white pb-1">Bus Routes</h5>
      {nameHeadsign.map((routeInfo, index) => (
        <div key={index}>
          <BusRoute routeInfo={routeInfo} setShapes={setShapes} />
        </div>
      ))}
    </div>
  );
};

export default RoutesModal;
