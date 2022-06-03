import React, { useState, useEffect } from "react";
import "./App.css";
import WorkoutList from "./WorkoutList"
import AthleteList from "./AthleteList"

function AthleteContainer () {

    const [athletes, setAthletes] = useState([])
    const [selectedAthlete, setSelectedAthlete] = useState("")
    const [workouts, setWorkouts] = useState([])
    const [workoutLogs, setWorkoutLogs] = useState([])
    console.log(workoutLogs)

    useEffect(() => {
        fetch("http://localhost:9292/athletes")
        .then((res) => res.json())
        .then((data) => setAthletes(data))
    }, [])

    useEffect(() => {
        fetch("http://localhost:9292/workouts")
        .then((res) => res.json())
        .then((data) => setWorkouts(data))
    }, [])

    useEffect(() => {
        fetch("http://localhost:9292/log_entries")
        .then((res) => res.json())
        .then((data) => setWorkoutLogs(data))
    }, [])


    function onLogSubmit(formData) {
        fetch("http://localhost:9292/log_entries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "athlete_id": formData.athlete_id,
                "workout_rating": formData.rating,
                "mileage": formData.mileage,
                "details": formData.details,
                "comments": formData.comments,
                "workout_id": formData.workout_id
            }),
        })
        .then((res) => res.json())
        .then((newLog) => setWorkoutLogs(...workoutLogs, newLog))
    }

    return (
        <div id="athlete_container">
            <AthleteList athletes={athletes} setSelectedAthlete={setSelectedAthlete}/>
            <WorkoutList workouts={workouts} workoutLogs={workoutLogs} onLogSubmit={onLogSubmit} selectedAthlete={athletes[selectedAthlete - 1]} athletes={athletes}/>
        </div>
    )
}

export default AthleteContainer