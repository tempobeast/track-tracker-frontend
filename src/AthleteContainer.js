import React, { useState, useEffect } from "react";
import "./App.css";
import WorkoutList from "./WorkoutList"
import AthleteList from "./AthleteList"

function AthleteContainer () {

    const [athletes, setAthletes] = useState([])
    const [selectedAthlete, setSelectedAthlete] = useState("")
    
    useEffect(() => {
    fetch("http://localhost:9292/")
    .then((res) => res.json())
    .then((data) => setAthletes(data))
}, [])

    return (
        <div id="athlete_container">
            <AthleteList athletes={athletes} setSelectedAthlete={setSelectedAthlete}/>
            <WorkoutList selectedAthlete={athletes[selectedAthlete - 1]} athletes={athletes}/>
        </div>
    )
}

export default AthleteContainer