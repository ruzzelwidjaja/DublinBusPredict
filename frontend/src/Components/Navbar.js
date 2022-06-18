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
            props.openModal
              ? props.setOpenModal(false)
              : props.setOpenModal(true);
          }}
          className="webbutton bg-zinc-900 hover:bg-gray-800 text-slate-100 font-medium py-5 px-4 border-t border-zinc-500"
        >
          Journey Planner
        </button>
        <button
          onClick={() => {
            props.openModal
              ? props.setOpenModal(false)
              : props.setOpenModal(true);
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
            props.openModal
              ? props.setOpenModal(false)
              : props.setOpenModal(true);
          }}
          className="bg-zinc-900 hover:bg-zinc-800 text-slate-100 font-medium py-2 px-6 rounded-l"
        >
          Journey <br />
          Planner
        </button>
        <button
          onClick={() => {
            props.openModal
              ? props.setOpenModal(false)
              : props.setOpenModal(true);
          }}
          className="bg-zinc-900 hover:bg-zinc-800 text-slate-100 font-medium py-2 px-6 border-l border-r border-zinc-500"
        >
          Routes
        </button>
        <button
          onClick={() => {
            props.openModal
              ? props.setOpenModal(false)
              : props.setOpenModal(true);
          }}
          className="bg-zinc-900 hover:bg-zinc-800 text-slate-100 font-medium py-2 px-6 rounded-r"
        >
          Sign In
        </button>
      </div>
      <button
        onClick={() => {
          props.openModal
            ? props.setOpenModal(false)
            : props.setOpenModal(true);
        }}
        className="webbutton webbutton-bottom bg-zinc-900 hover:bg-gray-800 text-slate-100 font-medium py-5 px-4 border-t border-zinc-500"
      >
        Sign In
      </button>
    </div>
  );
};

export default Navbar;
