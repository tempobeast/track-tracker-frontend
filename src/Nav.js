import React from "react";
import "./App.css";
import { NavLink } from "react-router-dom"

function Nav({onAddAthleteClick, onAddWorkoutClick}) {

  function handleAddAthleteClick(e) {
    onAddAthleteClick(e)
  }

  function handleAddWorkoutClick(e) {
    onAddWorkoutClick(e)
  }


return (
    <div id="nav">
      <NavLink className="nav_button" to="/">Home</NavLink>
      <NavLink className="nav_button" to="/new-athlete">New Athlete</NavLink>
      <NavLink className="nav_button" to="/new-workout">New Workout</NavLink>

        {/* <button className="nav_button" onClick={handleAddAthleteClick}>Add Athlete</button>
        <button className="nav_button" onClick={handleAddWorkoutClick }>Add Workout</button> */}
    </div>
    
  );
}
export default Nav