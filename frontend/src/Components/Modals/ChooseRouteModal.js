import React from "react";
import Option from "./Option";
import ReactLoading from "react-loading";

const ChooseRouteModal = ({
  routeOptions,
  chosenIndex,
  selectRoute,
  resultsReady,
}) => {
  return (
    <>
      {resultsReady && (
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
      )}
      {!resultsReady && (
        <div className="flex justify-center">
          <div>
            <ReactLoading type={"bubbles"} color="#475569" />
          </div>
        </div>
      )}
    </>
  );
};
export default ChooseRouteModal;
