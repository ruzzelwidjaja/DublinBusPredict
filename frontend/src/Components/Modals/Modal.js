import React from "react";
import JourneyPlannerModal from "./JourneyPlannerModal";
import RoutesModal from "./RoutesModal";
import "./Modal.css";
import ChooseRouteModal from "./ChooseRouteModal";

const Modal = ({
  modalType,
  setModalType,
  originRef,
  destinationRef,
  getRoutes,
  routeOptions,
  selectRoute,
  chosenIndex,
  directionsOutput,
}) => {
  return (
    <div className="modal">
      <div className="p-4 rounded-lg border shadow-md bg-zinc-900 border-gray-700">
        {modalType === "journeyPlanner" && (
          <JourneyPlannerModal
            setModalType={setModalType}
            originRef={originRef}
            destinationRef={destinationRef}
            getRoutes={getRoutes}
          />
        )}
        {modalType === "chooseRoutes" && directionsOutput && (
          <ChooseRouteModal
            chosenIndex={chosenIndex}
            routeOptions={routeOptions}
            selectRoute={selectRoute}
          />
        )}

        {modalType === "routes" && <RoutesModal />}
      </div>
    </div>
  );
};

export default Modal;
