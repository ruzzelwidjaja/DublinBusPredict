import React from "react";
import JourneyPlannerModal from "./JourneyPlannerModal";
import RoutesModal from "./RoutesModal";
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
    <div>
      <div className="z-10 max-h-64 overflow-y-scroll absolute -translate-y-2/4 -translate-x-2/4 left-2/4 top-28 md:top-40 mt-6 overflow-hidden w-8/12 md:w-6/12 md:max-w-sm">
        <div className="p-4 rounded-lg border shadow-md bg-zinc-900 border-gray-700 overflow-y-scroll	max-h-full">
          {modalType === "journeyPlanner" && (
            <JourneyPlannerModal
              setModalType={setModalType}
              originRef={originRef}
              destinationRef={destinationRef}
              getRoutes={getRoutes}
            />
          )}
          {modalType === "chooseRoutes" && directionsOutput && (
            <div>
              <ChooseRouteModal
                chosenIndex={chosenIndex}
                routeOptions={routeOptions}
                selectRoute={selectRoute}
              />
            </div>
          )}

          {modalType === "routes" && <RoutesModal />}
        </div>
      </div>
    </div>
  );
};

export default Modal;
