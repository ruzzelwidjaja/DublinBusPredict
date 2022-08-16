import React from "react";
import JourneyPlannerModal from "./JourneyPlannerModal";
import RoutesModal from "./RoutesModal";
import ChooseRouteModal from "./ChooseRouteModal";

const Modal = ({
  resultsReady,
  modalType,
  setModalType,
  originRef,
  destinationRef,
  getRoutes,
  routeOptions,
  selectRoute,
  chosenIndex,
  directionsOutput,
  nameHeadsign,
  setShapes,
  setDirectionsOutput,
  mapLoaded,
  timeValue,
  setTimeValue,
}) => {
  return (
    <div>
      <div className="z-10 max-h-64 overflow-y-scroll absolute -translate-y-2/4 -translate-x-2/4 left-2/4 top-28 md:top-40 mt-6 overflow-hidden w-8/12 md:w-6/12 md:max-w-sm inline-block">
        <div className="p-4 rounded-lg border shadow-md bg-zinc-900 border-gray-700 overflow-y-scroll	max-h-full">
          {modalType === "journeyPlanner" && (
            <JourneyPlannerModal
              setModalType={setModalType}
              originRef={originRef}
              destinationRef={destinationRef}
              getRoutes={getRoutes}
              setShapes={setShapes}
              timeValue={timeValue}
              setTimeValue={setTimeValue}
            />
          )}
          {modalType === "chooseRoutes" && directionsOutput && (
            <div>
              <ChooseRouteModal
                resultsReady={resultsReady}
                chosenIndex={chosenIndex}
                routeOptions={routeOptions}
                selectRoute={selectRoute}
              />
            </div>
          )}

          {/* In case of no route options, display error */}
          {modalType === "chooseRoutes" && directionsOutput === null && (
            <div>
              <p className="text-xs md:text-base rounded-lg block w-full p-1.5 text-white">
                Sorry, no routes were found for your journey.
              </p>
            </div>
          )}

          {modalType === "routes" && (
            <RoutesModal
              nameHeadsign={nameHeadsign}
              setShapes={setShapes}
              setDirectionsOutput={setDirectionsOutput}
              mapLoaded={mapLoaded}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
