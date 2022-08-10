import React from 'react';
import PropTypes from 'prop-types';
import "./Navbar.css";
import { BrowserRouter, Route, Link, useNavigate } from "react-router-dom";


function Nav1(props) {



    let navigate = useNavigate();
    function handleClick() {
        navigate("/");
      }


  const logged_out_nav = (
    <ul className="flex mb-4 bg-zinc-900 text-base font-light	tracking-wider  text-slate-100 font-medium">
      
      <button className=" text-md font-light hover:bg-amber-800 text-slate-100 font-medium py-6 px-6" onClick={handleClick}>
          Home
      </button>

      <button className="ml-auto text-md font-light hover:bg-amber-800 text-slate-100 font-medium py-6 px-6" onClick={() => props.display_form('signup')}>Signup</button>
      
      <button className="ml-0 text-md font-light hover:bg-amber-800 text-slate-100 font-medium py-6 px-6" onClick={() => props.display_form('login')}>Login</button>

    </ul>
  )

  const logged_in_nav = (
    <ul className="flex mb-4 bg-zinc-900 text-base font-light	tracking-wider  text-slate-100 font-medium">
      
      <button className=" text-md font-light hover:bg-amber-800 text-slate-100 font-medium py-6 px-6" onClick={handleClick}>
          Home
      </button>

      <button className="ml-auto text-md font-light hover:bg-amber-800 text-slate-100 font-medium py-6 px-6" onClick={props.handle_logout}>Logout</button>
      
    </ul>
  )
  return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Nav1;

Nav1.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};
