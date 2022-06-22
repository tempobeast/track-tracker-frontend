import React from "react";
import "./App.css";
import WorkoutList from "./WorkoutList";
import AthleteList from "./AthleteList";


function AthleteContainer ({ athletes, workouts, onLogSubmit, onLogDelete, onAthletePatchSubmit, onAthleteDelete, onAthleteClick, onSelectAll, selectedAthlete, setSelectedAthlete}) {

    const displayAthlete = athletes.find((athlete) => athlete.id === selectedAthlete.id)
    

    return (
        <div id="athlete_container">
            {selectedAthlete === "All" ? <h2>All Workouts</h2> : <h2>{displayAthlete.name}'s Workouts</h2>}
            <AthleteList athletes={athletes} onAthleteClick={onAthleteClick} onAthletePatchSubmit={onAthletePatchSubmit} onSelectAll={onSelectAll} onAthleteDelete={onAthleteDelete} selectedAthlete={selectedAthlete} setSelectedAthlete={setSelectedAthlete}/>
            <WorkoutList workouts={workouts} onLogSubmit={onLogSubmit} selectedAthlete={selectedAthlete} athletes={athletes} onLogDelete={onLogDelete}/>
        </div>
    )
}

export default AthleteContainer