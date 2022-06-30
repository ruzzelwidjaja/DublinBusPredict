import React, { useState } from "react";

const ChooseRouteModal = ({ routeOptions, chosenIndex, selectRoute }) => {
  // // Open state for instructions
  // const [open, setOpen] = useState(true);

  // // Set open state
  // const handleOpen = (id) => {
  //   setOpen(id);
  // };

  // Called when user selects route index
  const selectIndex = (id) => {
    selectRoute(id);
  };

  // Shows option selected
  const selectedColour = (id) => {
    if (id === chosenIndex) {
      return { backgroundColor: "#92400e" };
    }
    return;
  };

  return (
    <ul>
      {routeOptions.map((option) => (
        <li
          key={option.id}
          style={selectedColour(option.id)}
          className="px-6 py-0.5 text-left text-sm rounded-lg bg-zinc-900 hover:bg-amber-800 text-slate-100 border border-gray-700 my-2"
        >
          <button
            onClick={() => {
              selectIndex(option.id);
              // handleOpen(option.id);
            }}
          >
            Route {option.id} Distance {option.distance} Duration{" "}
            {option.duration}
          </button>
          {/* {open ? <div>{option.instructions}</div> : <div></div>} */}
        </li>
      ))}
    </ul>
  );
};
export default ChooseRouteModal;
