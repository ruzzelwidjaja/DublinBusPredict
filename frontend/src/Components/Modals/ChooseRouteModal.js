import React from "react";
import Option from "./Option";

const ChooseRouteModal = ({ routeOptions, chosenIndex, selectRoute, resultsReady }) => {
  return( <>{resultsReady && (
        <ul>
        {routeOptions.map( (option, index) => (
          <Option
            key={index}
            option={option}
            chosenIndex={chosenIndex}
            selectRoute={selectRoute}
          />
        ))}
      </ul>
  )}<p>"Not ready"{console.log(resultsReady)}</p></>);
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
