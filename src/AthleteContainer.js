import React, { useState, useEffect } from "react";
import "./App.css";
import Calendar from "./Calendar"

function AthleteContainer () {

    const [athletes, setAthletes] = useState([])
    
    useEffect(() => {
    fetch("http://localhost:9292/athletes")
    .then((res) => res.json())
    .then((data) => setAthletes(data))
}, [])
    
    return (
        <div>
            {athletes.map((athlete) => <p key={athlete.id}>{athlete.name}, {athlete.age}</p>)}
            {/* <Calendar/> */}
        </div>
    )
}

export default AthleteContainer