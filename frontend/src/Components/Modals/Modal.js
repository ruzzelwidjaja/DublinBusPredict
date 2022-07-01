import React, { useState } from "react";
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
  const [modalHeight, setModalHeight] = useState("max-content");

  return (
    <div>
      <div
        className="z-10 absolute -translate-y-2/4 -translate-x-2/4 left-2/4 top-52 md:top-52 overflow-hidden w-8/12 md:w-6/12"
        style={{ height: modalHeight }}
      >
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
        {/* {modalType === "chooseRoutes" && directionsOutput && (
          <button
            onClick={() => {
              modalHeight === "max-content"
                ? setModalHeight("15%")
                : setModalHeight("max-content");
            }}
          >
            TEST BUTTON
          </button>
        )} */}
      </div>
    </div>
  );
};

export default Modal;
