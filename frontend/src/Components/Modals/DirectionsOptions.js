import React from "react";

const DirectionsOptions = ({
  directions,
  setDirections,
  setOpenModal,
  setModalType,
  setRouteIndex,
}) => {
  return (
    <div>
      <div>
        <h5 className="text-xl font-medium text-white pb-4">Route Options</h5>
      </div>
      <div class="relative overflow-x-auto shadow-md rounded-lg">
        <table className="text-sm text-left text-white">
          <tbody>
            {directions &&
              directions.routes.map((route, index) => {
                if (
                  route.legs[0].steps[1].transit.line.agencies[0].name ===
                  "Dublin Bus"
                ) {
                  return (
                    <tr
                      onClick={() => {
                        setOpenModal(false);
                        setModalType("none");
                        setDirections(directions);
                        setRouteIndex(index);
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
                  );
                } else {
                  return (
                    <tr>
                      <td>No directions available for that route!</td>
                    </tr>
                  );
                }
              })}
            {directions === "none" && (
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
