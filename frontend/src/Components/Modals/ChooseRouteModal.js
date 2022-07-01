import React from "react";
import Option from "./Option";

const ChooseRouteModal = ({ routeOptions, chosenIndex, selectRoute }) => {
  return (
    <ul>
      {routeOptions.map((option) => (
        <Option
          option={option}
          chosenIndex={chosenIndex}
          selectRoute={selectRoute}
        />
      ))}
    </ul>
  );
};
export default ChooseRouteModal;
