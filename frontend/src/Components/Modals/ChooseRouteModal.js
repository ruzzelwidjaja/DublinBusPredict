import React from "react";

const ChooseRouteModal = ({ routeOptions, chosenIndex, selectRoute }) => {
  // Called when user selects route index
  const selectIndex = (id) => {
    selectRoute(id);
  };

  // Shows option selected
  // const selectedColour = (id) => {
  //   if (id === chosenIndex) {
  //     return { backgroundColor: "blue" };
  //   }
  //   return { backgroundColor: "white" };
  // };

  return (
    <ul>
      {routeOptions.map((option) => (
        <li
          key={option.id}
          className="px-6 py-0.5 text-left text-sm rounded-lg bg-zinc-900 hover:bg-amber-800 text-slate-100 border border-gray-700 my-2"
        >
          <button onClick={() => selectIndex(option.id)}>
            Route {option.id}
          </button>
        </li>
      ))}
    </ul>
  );
};
export default ChooseRouteModal;
