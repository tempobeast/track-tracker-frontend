import React from "react";
import "./App.css";

function Nav({onAddAthleteClick, onAddWorkoutClick}) {

  function handleAddAthleteClick(e) {
    onAddAthleteClick(e)
  }

  function handleAddWorkoutClick(e) {
    onAddWorkoutClick(e)
  }


return (
    <div id="nav">
        <button className="nav_button" onClick={handleAddAthleteClick}>Add Athlete</button>
        <button className="nav_button" onClick={handleAddWorkoutClick }>Add Workout</button>
    </div>
    
  );
}
export default Nav