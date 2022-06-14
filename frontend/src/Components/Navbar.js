import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div id="navbar">
      <div className="header">
        <h1 className="text-4xl font-sans tracking-wider ">Dublin Bus</h1>
      </div>

      <div className="webbuttons">
        <button className="webbutton bg-zinc-900 hover:bg-gray-800 text-slate-100 font-medium py-5 px-4 border-t border-zinc-500">
          Journey Planner
        </button>
        <button className="webbutton bg-zinc-900 hover:bg-gray-800 text-slate-100 font-medium py-5 px-4 border-t border-b border-zinc-500">
          Routes
        </button>
      </div>

      <div className="phonebuttons inline-flex">
        <button className="bg-zinc-900 hover:bg-zinc-800 text-slate-100 font-medium py-2 px-6 rounded-l">
          Journey <br />
          Planner
        </button>
        <button className="bg-zinc-900 hover:bg-zinc-800 text-slate-100 font-medium py-2 px-6">
          Routes
        </button>
        <button className="bg-zinc-900 hover:bg-zinc-800 text-slate-100 font-medium py-2 px-6 rounded-r">
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
