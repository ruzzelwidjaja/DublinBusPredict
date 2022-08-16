import React from "react";

const DirectionsOptions = ({
  directions,
  setOpenModal,
  setModalType,
  setDirections,
  selectRoute,
  directionsResponse,
  originRef,
  destinationRef,
}) => {
  // If directions are returned, break add a parameter that tells us if it is Dublin Bus or not
  if (directionsResponse) {
    directionsResponse.routes.forEach((route, index) => {
      // Route index
      let routeIndex = index;
      directionsResponse.routes.id = index;

      let legs = route.legs[0];
      let steps = legs.steps;

      steps.forEach((step) => {
        let stepTravelMode = step.travel_mode;

        // If the step involves taking the bus
        if (stepTravelMode === "TRANSIT") {
          let line = step.transit.line;
          let bus_type = line.agencies[0].name;

          // Prepare the result if it is a bus we use
          if (bus_type === "Go-Ahead" || bus_type === "Dublin Bus") {
            directionsResponse.routes[routeIndex].contains_non_dublin_bus =
              "NO";
          } else {
            directionsResponse.routes[routeIndex].contains_non_dublin_bus =
              "YES";
          }
        }
      });
    });
    // setDirections(routeOptions);
  }

  const handleOnClick = (index) => {
    setOpenModal(false);
    setModalType("none");
    selectRoute(index);
    setDirections(directionsResponse);
  };

  return (
    <div>
      <div>
        <h5 className="text-xl font-medium text-white pb-4">Route Options</h5>
      </div>
      <div className="shadow-md rounded-lg">
        <ul>
          {directionsResponse &&
            directionsResponse.routes.map((route, index) => (
              <li key={index}>
                <button value={index} onClick={handleOnClick}>
                  Arrival Time: {route.legs[0].duration.text}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default DirectionsOptions;
