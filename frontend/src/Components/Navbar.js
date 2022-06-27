import React from "react";
import "./Navbar.css";
import dublin_bus_logo from "../Assets/Dublin_Bus_Logo.png";

const Navbar = (props) => {
  return (
    <div>
      <div className="header text-white pt-4">
        <div className="mb-4 mt-3 ml-3">
          <img
            src={dublin_bus_logo}
            className="inline-block w-1/3 h-14 object-scale-down"
          />

          <h1 className="font-sans inline-block w-2/3 text-2xl pt-4">
            Dublin Bus
          </h1>
        </div>
        <h2 className="text-m font-sans tracking-wider">Journey Planner App</h2>
      </div>

      {/* Web Buttons */}
      <div className="webbuttons">
        <button
          onClick={() => {
            if (!props.openModal) {
              props.setOpenModal(true);
              props.setModalType("journeyPlanner");
            } else if (
              props.openModal &&
              props.modalType !== "journeyPlanner"
            ) {
              props.setModalType("journeyPlanner");
            } else {
              props.setOpenModal(false);
              props.setModalType("none");
            }
          }}
          className="text-left text-sm webbutton bg-zinc-900 hover:bg-amber-800 text-slate-100 font-medium py-3 px-7 mt-6"
        >
          Journey Planner
        </button>
        <button
          onClick={() => {
            if (!props.openModal) {
              props.setOpenModal(true);
              props.setModalType("routes");
            } else if (props.openModal && props.modalType !== "routes") {
              props.setModalType("routes");
            } else {
              props.setOpenModal(false);
              props.setModalType("none");
            }
          }}
          className="text-left text-sm webbutton bg-zinc-900 hover:bg-amber-800 text-slate-100 font-medium py-3 px-7"
        >
          Routes
        </button>
      </div>

      {/* Phone buttons */}
      <div className="phonebuttons inline-flex">
        <button
          onClick={() => {
            if (!props.openModal) {
              props.setOpenModal(true);
              props.setModalType("journeyPlanner");
            } else if (
              props.openModal &&
              props.modalType !== "journeyPlanner"
            ) {
              props.setModalType("journeyPlanner");
            } else {
              props.setOpenModal(false);
              props.setModalType("none");
            }
          }}
          className="text-sm bg-zinc-900 hover:bg-amber-800 text-slate-100 font-medium py-2 px-6 rounded-l-2xl"
        >
          Journey <br />
          Planner
        </button>
        <button
          onClick={() => {
            if (!props.openModal) {
              props.setOpenModal(true);
              props.setModalType("routes");
            } else if (props.openModal && props.modalType !== "routes") {
              props.setModalType("routes");
            } else {
              props.setOpenModal(false);
              props.setModalType("none");
            }
          }}
          className="bg-zinc-900 text-sm hover:bg-amber-800 text-slate-100 font-medium py-2 px-6 border-l border-r border-zinc-500"
        >
          Routes
        </button>
        <button className="bg-zinc-900 text-sm hover:bg-amber-800 text-slate-100 font-medium py-2 px-6 rounded-r-2xl">
          Sign In
        </button>
      </div>
      <button className="webbutton text-left text-sm webbutton-bottom bg-zinc-900 hover:bg-amber-800 text-slate-100 font-medium py-4 px-7 mb-4">
        Sign In
      </button>
    </div>
  );
};

export default Navbar;
