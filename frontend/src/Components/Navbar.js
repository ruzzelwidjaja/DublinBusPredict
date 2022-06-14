import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div id="navbar">
      <div className="inline-flex">
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
    </div>
  );
};

export default Navbar;
