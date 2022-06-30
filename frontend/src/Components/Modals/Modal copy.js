import React, { useState, useRef } from "react";
import JourneyPlannerModal from "./JourneyPlannerModal";
import RoutesModal from "./RoutesModal";
import DirectionsOptions from "./DirectionsOptions";
import "./Modal.css";

const Modal = (props) => {
  // References for origin and destination input
  const originRef = useRef("");
  const destinationRef = useRef("");
  const [directionsResponse, setDirectionsResponse] = useState();
  return (
    <div className="modal">
      <div className="p-4 rounded-lg border shadow-md bg-zinc-900 border-gray-700">
        {props.modalType === "journeyPlanner" && (
          <JourneyPlannerModal
            setDirectionsResponse={setDirectionsResponse}
            setOpenModal={props.setOpenModal}
            setModalType={props.setModalType}
            setDirections={props.setDirections}
            originRef={originRef}
            destinationRef={destinationRef}
          />
        )}
        {props.modalType === "directionsOptions" && (
          <DirectionsOptions
            directionsResponse={directionsResponse}
            setDirections={props.setDirections}
            setOpenModal={props.setOpenModal}
            setModalType={props.setModalType}
            selectRoute={props.selectRoute}
            originRef={originRef}
            destinationRef={destinationRef}
          />
        )}
        {props.modalType === "routes" && <RoutesModal />}
      </div>
    </div>
  );
};

export default Modal;
