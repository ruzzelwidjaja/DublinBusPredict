import React from "react";

const DirectionsOptions = ({
  directions,
  setDirections,
  setOpenModal,
  setModalType,
  setRouteIndex,
  setRouteCoords,
}) => {
  let resultsArray = [];

  // If directions are returned, break the directions into segments, for each route provided
  if (directions) {
    directions.routes.map((route, index) => {
      // Create a sub array for each route that is returned
      resultsArray.push([]);
      let resultNumber = index;

      let legs = route.legs[0];
      let overview_path = route.overview_path;
      // For each route, get distance, duration and steps
      let routeDistance = legs.distance.text;
      let routeDuration = legs.duration.text;
      let steps = legs.steps;

      // Give each route distance and duration properties
      resultsArray[index].totalDuration = routeDuration;
      resultsArray[index].totalDistance = routeDistance;
      resultsArray[index].routeCoordinates = overview_path;

      // For each step of the journey, get relevant info
      steps.map((step, index) => {
        let stepDistance = step.distance.text;
        let stepDuration = step.duration.text;
        let stepInstructions = step.instructions;
        let stepTravelMode = step.travel_mode;

        // Create a sub array for each step of the route
        resultsArray[resultNumber].push([]);

        // Give each step the desired properties
        resultsArray[resultNumber][index].stepDistance = stepDistance;
        resultsArray[resultNumber][index].stepDuration = stepDuration;
        resultsArray[resultNumber][index].stepInstructions = stepInstructions;
        resultsArray[resultNumber][index].stepTravelMode = stepTravelMode;

        // If the step involves taking the bus
        if (stepTravelMode === "TRANSIT") {
          let line = step.transit.line;
          let bus_type = line.agencies[0].name;

          // Prepare the result if it is a bus we use
          if (bus_type === "Go-Ahead" || bus_type === "Dublin Bus") {
            let arrival_stop = step.transit.arrival_stop;
            let departure_stop = step.transit.departure_stop;
            let bus_number = line.short_name;

            resultsArray[resultNumber][index].bus_type = bus_type;
            resultsArray[resultNumber][index].arrival_stop = arrival_stop;
            resultsArray[resultNumber][index].departure_stop = departure_stop;
            resultsArray[resultNumber][index].bus_number = bus_number;
          } else {
            // If there is a bus provided in the directions that is not a dublin bus
            resultsArray[resultNumber].contains_non_dublin_bus = "YES";
          }
        }
      });
    });
  }

  return (
    <div>
      <div>
        <h5 className="text-xl font-medium text-white pb-4">Route Options</h5>
      </div>
      <div className="relative overflow-x-auto shadow-md rounded-lg">
        <table className="text-sm text-left text-white">
          <tbody>
            <tr
              onClick={() => {
                setOpenModal(false);
                setModalType("none");
                setDirections(directions);
                setRouteIndex(index);
                const routeCoordinates = directions.routes[index].overview_path;
                setRouteCoords(routeCoordinates);
              }}
              key={index}
              className="text-xs rounded-2xl bg-slate-700 whitespace-pre hover:bg-slate-600"
            >
              <td className="px-6 py-4">
                {route.legs[0].steps[1].transit.line.short_name}
              </td>
              <td className="px-6 py-4">
                {route.legs[0].steps[1].transit.departure_stop.name}
              </td>
              <td className="px-6 py-4">
                {route.legs[0].steps[1].transit.num_stops}
              </td>
            </tr>
            {/* If there are no directions for the route */}
            {directions === null && (
              <tr>
                <td>No directions available for that route!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DirectionsOptions;
