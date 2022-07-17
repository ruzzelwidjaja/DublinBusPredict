import React from "react";
import BusRoute from "./BusRoute";

const RoutesModal = ({ routes }) => {
  return (
    <div>
      <h5 className="text-xl font-medium text-white pb-1">Bus Routes</h5>
      {routes.map((route, index) => (
        <div key={index}>
          <BusRoute route={route} />
        </div>
      ))}
    </div>
  );
};

export default RoutesModal;
