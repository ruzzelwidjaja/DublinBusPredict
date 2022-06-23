import React from "react";

const DirectionsOptions = ({ directions }) => {
  return (
    <div>
      {directions &&
        directions.routes.map((route, index) => <div>Route: {index + 1}</div>)}
      {directions === null && (
        <div>No directions available for that route!</div>
      )}
    </div>
  );
};

export default DirectionsOptions;
