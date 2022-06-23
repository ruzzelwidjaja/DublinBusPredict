import React from "react";
import "./Navbar.css";
import dublin_bus_logo from "../Assets/dublin_bus_logo.png";

const Navbar = (props) => {
  return (
    <div>
      <div className="header text-white">
        <h1 className="text-4xl font-sans tracking-wider pt-6 pb-2">
          Dublin Bus
        </h1>
        {/* <img src={dublin_bus_logo} /> */}
        <h2 className="text-l font-sans tracking-wider">Journey Planner App</h2>
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
