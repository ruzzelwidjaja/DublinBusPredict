import React from "react";
import Option from "./Option";

const ChooseRouteModal = ({ routeOptions, chosenIndex, selectRoute }) => {
  return (
    <ul>
      {routeOptions.map((option, index) => (
        <Option
          key={index}
          option={option}
          chosenIndex={chosenIndex}
          selectRoute={selectRoute}
        />
      ))}
    </ul>
  );
};
export default ChooseRouteModal;
