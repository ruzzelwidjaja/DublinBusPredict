import React from "react";

const ChooseRouteModal = ({ routeOptions, chosenIndex, selectRoute }) => {
  // Called when user selects route index
  const selectIndex = (id) => {
    selectRoute(id);
  };

  // // Shows option selected
  // const bgColor = (id) => {
  //   if (id === chosenIndex) {
  //     return { backgroundColor: "blue" };
  //   }
  //   return { backgroundColor: "white" };
  // };

  return (
    <ul>
      {routeOptions.map((option) => (
        <li key={option.id} className="px-6 py-0.5">
          <button onClick={() => selectIndex(option.id)}>
            Route {option.id}
          </button>
        </li>
      ))}
    </ul>
  );
};
export default ChooseRouteModal;
