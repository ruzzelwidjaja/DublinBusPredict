import React from "react";
import JourneyPlannerModal from "./JourneyPlannerModal";
import RoutesModal from "./RoutesModal";
import DirectionsOptions from "./DirectionsOptions";
import "./Modal.css";

const Modal = (props) => {
  return (
    <div className="modal">
      <div className="p-4 rounded-lg border shadow-md bg-gray-800 border-gray-700">
        {props.modalType === "journeyPlanner" && (
          <JourneyPlannerModal
            setDirections={props.setDirections}
            setOpenModal={props.setOpenModal}
            setModalType={props.setModalType}
          />
        )}
        {props.modalType === "directionsOptions" && (
          <DirectionsOptions directions={props.directions} />
        )}
        {props.modalType === "routes" && <RoutesModal />}
      </div>
    </div>
  );
};

export default Modal;
