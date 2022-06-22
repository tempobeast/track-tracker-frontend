import React from "react";
import "./App.css";
import { NavLink } from "react-router-dom"

function Nav() {

return (
    <div id="nav">
      <NavLink className="nav_button" to="/">Home</NavLink>
      <NavLink className="nav_button" to="/new-athlete">New Athlete</NavLink>
      <NavLink className="nav_button" to="/new-workout">New Workout</NavLink>
    </div>
    
  );
}
export default Nav