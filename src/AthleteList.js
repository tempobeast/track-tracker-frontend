import React from "react";
import "./App.css";
import AthleteCard from "./AthleteCard";


function AthleteList ({ athletes, onAthleteClick, onSelectAll, onAthletePatchSubmit, onAthleteDelete, selectedAthlete, setSelectedAthlete }) {

    function handleClick(e) {
        onAthleteClick(e.target.id)
    }

    function handleAllClick(e){
        onSelectAll("All")
    }

    const alphaOrder = athletes.sort((a, b) => a.name.localeCompare(b.name) )

    return (
        <div id="athlete_list" >
            <p>Show workouts for:</p>
             <p onClick={handleAllClick} className="show_all" name="All">All</p>
            {alphaOrder.map((athlete) => 
                <AthleteCard key={athlete.id} onAthletePatchSubmit={onAthletePatchSubmit} athlete={athlete} handleClick={handleClick} onAthleteDelete={onAthleteDelete} selectedAthlete={selectedAthlete} setSelectedAthlete={setSelectedAthlete}/>
            )}
           
        </div>
    )
}

export default AthleteList