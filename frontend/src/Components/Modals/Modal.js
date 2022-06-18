import React from "react";
import JourneyPlannerModal from "./JourneyPlannerModal";
import RoutesModal from "./RoutesModal";
import "./Modal.css";

const Modal = (props) => {
  return (
    <div className="modal">
      <div className="p-4 rounded-lg border shadow-md bg-gray-800 border-gray-700">
        {props.modalType === "journeyPlanner" && <JourneyPlannerModal />}
        {props.modalType === "routes" && <RoutesModal />}
      </div>
    </div>
  );
};

export default Modal;
