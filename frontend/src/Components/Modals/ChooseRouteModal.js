import React from "react";
import Option from "./Option";
import ReactLoading from "react-loading";

const ChooseRouteModal = ({
  routeOptions,
  chosenIndex,
  selectRoute,
  resultsReady,
}) => {
  // const results = await Promise.all(routeOptions)
  // console.log(results);

  return (
    <>
      {resultsReady && (
        <ul>
          {routeOptions.map((option, index) => {
            return (
              <Option
                key={index}
                option={option}
                chosenIndex={chosenIndex}
                selectRoute={selectRoute}
              />
            );
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
  // if (resultsReady) {
  //   routeOptions = Promise.all(routeOptions);
  //   console.log("route options: " + routeOptions);
  //   return (
  //     <ul>
  //       {routeOptions.map( (option, index) => (
  //         <Option
  //           key={index}
  //           option={option}
  //           chosenIndex={chosenIndex}
  //           selectRoute={selectRoute}
  //         />
  //       ))}
  //     </ul>
  //   );
  //  }
};
export default ChooseRouteModal;
