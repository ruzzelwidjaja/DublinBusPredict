import React from "react";
import Option from "./Option";

const ChooseRouteModal = ({ routeOptions, chosenIndex, selectRoute }) => {
  return (
    <ul>
      {routeOptions.map((option, index) => {
        if (option.remove === "NO") {
          return (
            <Option
              key={index}
              option={option}
              chosenIndex={chosenIndex}
              selectRoute={selectRoute}
            />
          );
        } else {
          return <></>;
        }
      })}
    </ul>
  );
};
export default ChooseRouteModal;
