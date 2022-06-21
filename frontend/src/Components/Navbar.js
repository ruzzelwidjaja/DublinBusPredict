import React from "react";
import "./Navbar.css";

const Navbar = (props) => {
  return (
    <div>
      <div className="header">
        <h1 className="text-4xl font-sans tracking-wider py-2">Dublin Bus</h1>
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
          className="webbutton bg-zinc-900 hover:bg-gray-800 text-slate-100 font-medium py-5 px-4 border-t border-zinc-500"
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
          className="webbutton bg-zinc-900 hover:bg-gray-800 text-slate-100 font-medium py-5 px-4 border-t border-b border-zinc-500"
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
          className="bg-zinc-900 hover:bg-zinc-800 text-slate-100 font-medium py-2 px-6 rounded-l-2xl"
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
          className="bg-zinc-900 hover:bg-zinc-800 text-slate-100 font-medium py-2 px-6 border-l border-r border-zinc-500"
        >
          Routes
        </button>
        <button className="bg-zinc-900 hover:bg-zinc-800 text-slate-100 font-medium py-2 px-6 rounded-r-2xl">
          Sign In
        </button>
      </div>
      <button className="webbutton webbutton-bottom bg-zinc-900 hover:bg-gray-800 text-slate-100 font-medium py-5 px-4 border-t border-zinc-500">
        Sign In
      </button>
    </div>
  );
};

export default Navbar;
